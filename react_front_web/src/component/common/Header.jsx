import { Link, Navigate } from "react-router-dom";
import "./default.css";
import { useState } from "react";


const Header = (props) => {
    const isLogin = props.isLogin;
    const setIsLogin = props.setIsLogin;
    return(
        <header className="header">
            <div>
                <div className="logo">
                    <Link to="/">Lee s world</Link>
                </div>
                <MainNavi/> 
                <HeaderLink isLogin={isLogin} setIsLogin={setIsLogin}/>
            </div>
        </header>
    );
};

const MainNavi = () => {
    return(
        <nav className="nav">
            <ul>
                <li>
                    <Link to='#'>메뉴1</Link>
                </li>
                <li>
                    <Link to='#'>메뉴2</Link>
                </li>
                <li>
                    <Link to='#'>메뉴3</Link>
                </li>
                <li>
                    <Link to='#'>메뉴4</Link>
                </li>
            </ul>
        </nav>
    );
};

const HeaderLink = (props) => {
    const isLogin = props.isLogin;
    const setIsLogin = props.setIsLoginLogin;

    const logout = () => {
        setIsLogin(false);
        Navigate("/");
    };
    return(
        
        <ul className="user-menu">
            {isLogin ?  (
            <>
            <li>
                <Link to="#">마이페이지</Link>
            </li>
            <li>
                <Link to="#" onClick={logout}>로그아웃</Link>
            </li>
            </>
            ):(
            <>
            <li>
                <Link to="/member/login">로그인</Link>
            </li>
            <li>
                <Link to="/member/join">회원가입</Link>
            </li>
            </>
            )}
        </ul>
    );
};
export default Header;