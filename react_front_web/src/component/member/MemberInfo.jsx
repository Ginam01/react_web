import { useRecoilState, useRecoilValue } from "recoil";
import { authReadyState, loginIdState, memberTypeState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MemberInfo = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const authReady = useRecoilValue(authReadyState);
    const [member, setMember] = useState(null);
    const [memberType, setMemberType]= useRecoilState(memberTypeState);
    const navigate = useNavigate();
    const inputMemberData = (e) => {
        const name = e.target.name;
        const value= e.target.value;
        const newMember = {...member, [name]: value};
        setMember(newMember);
    }

    useEffect(()=> {
        if (!authReady) return;
        axios.get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            setMember(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[authReady, memberId]);

    const memberUpdate = () => {
        axios.patch(`${import.meta.env.VITE_BACK_SERVER}/member`,member)
        .then((res)=> {
            console.log(res);
            if (res.data === 1){
                Swal.fire({
                    title: "정보 수정 완료",
                    icon: "success",
                });
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    const deleteMember = () => {
        Swal.fire({
            title : "회원 탈퇴",
            text: "회원을 탈퇴하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "탈퇴하기",
            cancelButtonText: "취소",
        }).then((res1)=>{
            if (res1.isConfirmed){
                axios.delete(`${import.meta.env.VITE_BACK_SERVER}/member/${member.memberId}`)
                .then((res)=>{
                    if(res.data === 1){
                        Swal.fire({
                            title:"회원탈퇴 완료",
                            icon: "info",
                        }).then(()=> {
                            setMember("");
                            setMemberType(0);
                            delete axios.defaults.headers.common["Authorization"];
                            window.localStorage.removeItem("refreshToken");
                            navigate("/");
                        });
                    }
                })
            }
        })
    }
    return(
        <div>
            <div className="page-title">내 정보</div>
            {member !== null && (
                <form onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <table className="tbl my-info">
                        <tbody>
                            <tr>
                                <th style={{width : "20%"}}>아이디</th>
                                <th className="left">{member.memberId}</th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <div className="input-item">
                                        <input
                                            type="text"
                                            name="memberName"
                                            value={member.memberName || ""}
                                            onChange={inputMemberData}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <div className="input-item">
                                        <input
                                            type="text"
                                            name="memberPhone"
                                            value={member.memberPhone || ""}
                                            onChange={inputMemberData}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>회원등급</th>
                                <td className="left">
                                    {member.memberType === 1 ? "관리자" : "일반회원"}
                                </td>
                            </tr>
                                
                        </tbody>
                    </table>
                    <div className="button-zone">
                        <button type="submit" className="btn-primary lg" onClick={memberUpdate}>
                            정보수정
                        </button>
                        <button type="submit" className="btn-secondary lg" onClick={deleteMember}>
                            회원탈퇴
                        </button>
                    </div>

                </form>
            )}
        </div>
    );
};
export default MemberInfo;
