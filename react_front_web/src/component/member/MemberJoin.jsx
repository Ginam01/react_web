import "./member.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Swal from 'sweetalert2';

const MemberJoin = () =>{
    const [member, setMember] = useState({
        memberId: "",
        memberPw: "",
        memberName: "",
        memberPhone: "",        
    });

    const [memberPwRe, setMemberPwRe] = useState("");

    const inputMemberData = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        const newMember = {...member, [name]: value};
        setMember(newMember);
        console.log(newMember);
    };

    const backServer = import.meta.env.VITE_BACK_SERVER;
    const navigate = useNavigate();

    // 유효성 검사를 위한 state
    const [idchk, setIdChk] = useState(0);
    // 0: 체크하지 않은 상태, 1: 정규표현식+중복체크 통과, 2: 정규표현식 불통, 3: 아이디 중복

    const checkId = () => {
        const idReg = /^[a-zA-Z0-9]{6,12}$/;
        if(idReg.test(member.memberId)){
            axios.get(`${backServer}/member/exists?memberId=${member.memberId}`)
            .then((res)=> {
                if(res.data === 1){
                    setIdChk(3);
                }else{
                    setIdChk(1);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            setIdChk(2);
        }
    };

    const pwMsgRef = useRef(null);

    const checkPw = () => {
        pwMsgRef.current.classList.remove("valid");
        pwMsgRef.current.classList.remove("invalid");
        
        if(member.memberPw === memberPwRe){
            pwMsgRef.current.classList.add("valid");
            pwMsgRef.current.innerText = "비밀번호가 일치합니다.";
        } else {
            pwMsgRef.current.classList.add("invalid");
            pwMsgRef.current.innerText = "비밀번호가 일치하지 않습니다";
        }
    }

    const joinMember = () => {
    if(member.memberName !== "" && member.memberPhone !== "" && idchk === 1 && pwMsgRef.current.classList.contains("valid")
    ){
    axios.post(`${backServer}/member`,member)
    .then((res)=>{
        if(res.data === 1){
            navigate("/");
        }
    }).catch((err)=>{
        console.log(err);
    })

    }else{
        Swal.fire({
            title: "입렵값 확인",
            text:"입력값을 확인하세요",
            icon: "warning",
        });
    }};

    return(
        <section className="section join-wrap">
            <div className="page-title">회원가입</div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                joinMember();
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
                            onBlur={checkId}
                        />
                    </div>
                    <p className={`input-msg ${idchk === 1 ? 'valid' : idchk === 2 || idchk === 3 ? 'invalid' : ''}`}>
                        {idchk === 0 ? "" :
                        idchk === 1 ? "사용 가능한 아이디입니다." :
                        idchk === 2 ? "아이디는 영어 대/소문자+숫자로 6~12글자로 입력해주세요." :
                        "이미 사용중입니다."}
                    </p>
                </div>


                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPw">패스워드</label>
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


                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPwRe">패스워드 확인</label>
                    </div>
                    <div className="input-item">
                        <input
                            type="password" 
                            name="memberPwRe" 
                            id="memberPwRe" 
                            value={memberPwRe} 
                            onChange={(e)=> setMemberPwRe(e.target.value)}
                            onBlur={checkPw}
                        />
                    </div>
                    <p className="input-msg" ref={pwMsgRef}></p>
                </div>


                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberName">이름</label>
                    </div>
                    <div className="input-item">
                        <input
                            type="text" 
                            name="memberName" 
                            id="memberName" 
                            value={member.memberName} 
                            onChange={inputMemberData}
                        />
                    </div>
                </div>

                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPhone">전화번호</label>
                    </div>
                    <div className="input-item">
                        <input
                            type="text" 
                            name="memberPhone" 
                            id="memberPhone" 
                            value={member.memberPhone} 
                            onChange={inputMemberData}
                        />
                    </div>
                </div>

                <div className="join-button-box">
                    <button type="submit" className="btn-primary lg">
                        회원가입
                    </button>
                </div>
            </form>
        </section>
    );
};

export default MemberJoin;
