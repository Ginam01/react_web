import { useRecoilState, useRecoilValue } from "recoil";
import { authReadyState, isLoginState, loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes} from "react-router-dom";
import LeftSideMenu from "../utils/LeftSideMenu";
import MemberInfo from "./MemberInfo";
import ChangePw from "./ChangePw";

const MemberMain = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [member,setMember] = useState(null); //마이페이지에서 사용할 로그인 저장
    const [authReady, setAuthReady] = useRecoilState(authReadyState);
    const isLogin = useRecoilValue(isLoginState);
    const navigate = useNavigate();
    

    useEffect(()=> {
        if (authReady && !isLogin){
            navigate("/");
        }
    },[authReady]); 
    const [menus, setMemus] = useState([
        {url : "/member/info", text : "내 정보"},
        {url : "/member/changePw", text : "비밀번호 변경"},

    ]);

    return(
    <div className="mypage-wrap">
        <h3>마이페이지</h3>
        <div className="mypage-wrap">
            <div className="mypage-side">
                <section className="section account-box">
                <div>My page</div>
                </section>
                <section className="section">
                    <LeftSideMenu menus={menus}/>
                </section>
            </div>
            <div className="mypage-content">
                <section className="section">
                    
        <Routes>
            <Route path="info" element={<MemberInfo />}></Route> 
            <Route path="changePw" element={<ChangePw />}></Route>
        </Routes>
                </section>
            </div>
            
        </div>

    </div>
);
};

export default MemberMain;