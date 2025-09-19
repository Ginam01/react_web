import { Route, Routes} from "react-router-dom";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Main from "./component/common/Main";
import MemberJoin from "./component/member/MemberJoin";
import MemberLogin from "./component/member/MemberLogin";
import MemberMain from "./component/member/MemberMain.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "./component/utils/RecoilData.js";

function App() {
  const [memberId, setMember]= useRecoilState(loginIdState);
  const [memberType, setMemberType]= useRecoilState(memberTypeState);
  useEffect(()=> {
    refreshLogin();

  },[]);
  const refreshLogin = () =>{
    //최초 화면을 접속하면 로컬 스토리지에 저장되어있는 refreshToken을 가져와서 자동으로 로그인 처리
    const refreshToken = window.localStorage.getItem("refreshToken");
    //한 번도 로그인 하지 않았거나, 로그아웃을 했으면 refreshToken이 존재하지않음
    //갱신할 정보가 없다는뜻
    if(refreshToken !== null){
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios.get(`${import.meta.env.VITE_BACK_SERVER}/member/refresh`)
      .then((res)=> {
        console.log("refresh");
        console.log(res);
        setMember(res.data.memberId);
        setMemberType(res.data.memberType);
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        window.localStorage.setItem("refreshToken",res.data.refreshToken);


      }).catch((err)=> {
        setMember("");
        setMemberType(0);
        delete axios.defaults.headers.common["Authorization"];
        window.localStorage.removeItem("refreshToken");
      })
    }else{
      console.log("토큰없");
    }
  }
  return (
    <div className='wrap'>
    <Header/>
    <main className="content">
      <Routes> 
        <Route path="/" element={<Main/>} />
        <Route path="/member/join" element={<MemberJoin/>} />
        <Route path="/member/login" element={<MemberLogin/>}/>
        <Route path="/member/mypage" element={<MemberMain/>}/>
      </Routes>
    </main>
    <Footer/>
    </div>

  )
}

export default App
