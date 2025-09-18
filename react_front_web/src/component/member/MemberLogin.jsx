import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MemberLogin = (props) => {
    const setIsLogin = props.setIsLogin;
    const [member, setMember] = useState({
        memberId: "",
        memberPw: "",
    });

    const inputMemberData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMember({ ...member, [name]: value });
    };
    const navigate = useNavigate();
    const login = () => {
        if (member.memberId !== "" && member.memberPw !== ""){
            const backServer = import.meta.env.VITE_BACK_SERVER;
            axios.post(`${backServer}/member/login`,member)
            .then((res)=>{
                Swal.fire({
                    title: "로그인 성공",
                    text: "환영합니다!",
                })
                setIsLogin(true);
                navigate("/");
                
            }).catch((err)=>{
                Swal.fire({
                    title: "로그인 실패",
                    text: "아이디 또는 비밀번호를 입력하세요",
                })
            });

        }else{
            Swal.fire({
                text: "아이디 또는 비밀번호를 입력하세요.",
                icon: "info",
                
            });
        }
    }

    return (
        <section className="section login-wrap">
            <div className="page-title">로그인</div>
            <form onSubmit={(e)=> {
            e.preventDefault()
            login();
            }}>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberId">아이디</label>
                    </div>
                    <div className="input-item">
                        <input  
                            type="text"
                            name="memberId"
                            id="memberId"
                            value={member.memberId}
                            onChange={inputMemberData}
                        />
                    </div>
                </div>

                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPw">비밀번호</label>
                    </div>
                    <div className="input-item">
                        <input  
                            type="password"
                            name="memberPw"
                            id="memberPw"
                            value={member.memberPw}
                            onChange={inputMemberData}
                        />
                    </div>
                </div>

                <div className="login-button-box">
                    <button type="submit" className="btn-primary lg">
                        로그인
                    </button>
                </div>

                <div className="member-link-box">
                    <Link to="/member/join">회원가입</Link>
                    <Link to="*">아이디찾기</Link>
                </div>
            </form>
        </section>
    );
};

export default MemberLogin;
