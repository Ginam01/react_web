import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePw = () => {
    const [memberId , setMemberId] = useRecoilState(loginIdState);
    const [member,setMember] = useState({memberId:memberId , memberPw:""});
    const [isAuth, setIsAuth] = useState(false);
    const [memberPwRe, setMemberPwRe] = useState("");
    const inputPw = (e) =>{
        const newMember = {...member,memberPw: e.target.value};
        setMember(newMember);

    };
    const inputPwRe = (e) => {
        setMemberPwRe(e.target.value);
    };
    const PwCheck = () => {
        axios.post(`${import.meta.env.VITE_BACK_SERVER}/member/pw-check`,member)
        .then((res)=>{
            console.log(res);
            if(res.data === 1){
                //정상일때 true로 체크하는 state 
                setIsAuth(true);
                setMember({...member, memberPw: ""}); // 비밀번호 변경시 재사용하기 위해서 memberPw초기화
            }else{
                //비정상 패스워드가 틀렸을때
                Swal.fire({
                    title: "비밀번호를 입력해주세요",
                    icon: "question",
                });
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    const updatePw = () => {
        if(member.memberPw !== "" && member.memberPw === memberPwRe){
            axios.patch(`${import.meta.env.VITE_BACK_SERVER}/member/password`,member)
            .then((res)=> {
                console.log(res);
                if(res.data === 1){
                    Swal.fire({
                        title:"비밀번호 변경 완료",
                        icon: "success",
                    })}
            })
            .catch((err)=> {
                console.log(err);
            });
        }else{
            Swal.fire({
                title: "비밀번호를 정상입력 하세요",
                icon: "info",
            });
        }
    };
    return(

        <div>
            <div className="page-title">비밀번호 변경</div>
            <div style={{width:"60%", margin:"0 auto"}}>

            {isAuth ? (
                <form 
                onSubmit={(e)=>{
                    e.preventDefault();
                }}
                >
                    <div className="input-wrap">
                        <div className="input-title">
                            <label htmlFor="newPw">새 비밀번호</label>
                        </div>
                        <div className="input-item">
                            <input 
                            type="password"
                            id="newPw"
                            name="newPw"
                            value={member.memberPw}
                            onChange={inputPw}
                            ></input>
                        </div>
                    </div>
                    <div className="input-wrap"style={{ marginTop: "50px"}}>
                        <div className="input-title">
                            <label htmlFor="newPwRe">한 번더 입력</label>
                        </div>
                            <div className="input-item">
                                <input type="password" id="newPwRe" name="newPwRe" value={memberPwRe} onChange={inputPwRe}>
                                </input>
                            </div>
                        <button type="submit" className="btn-primary lg" onClick={updatePw}>
                            변경하기
                        </button>
                    </div>
                </form>
                ) : (
                    <form onSubmit={(e)=>{
                    e.preventDefault();
                    PwCheck();
                }}
            >   
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="oldPw">기존 비밀번호 입력</label>
                    </div>
                    <div className="input-item">
                        <input type="password"
                        name="oldPw"
                        id="oldPw"
                        value={member.memberPw}
                        onChange={inputPw}></input>
                        <button type="submit" className="btn-primary">
                            확인
                        </button>
                    </div>
                </div>
            </form>
            )}
            </div>
        </div>
    );
};

export default ChangePw;