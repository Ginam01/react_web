import { Route, Routes} from "react-router-dom";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Main from "./component/common/Main";
import MemberJoin from "./component/member/MemberJoin";
import MemberLogin from "./component/member/MemberLogin";
import { useState } from "react";

function App() {
  const[isLogin, setIsLogin] = useState(false);
  return (
    <div className='wrap'>
    <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
    <main className="content">
      <Routes> 
        <Route path="/" element={<Main/>} />
        <Route path="/member/join" element={<MemberJoin/>} />
        <Route path="/member/login" element={<MemberLogin setIsLogin={setIsLogin}/>}/>
      </Routes>
    </main>
    <Footer/>
    </div>

  )
}

export default App
