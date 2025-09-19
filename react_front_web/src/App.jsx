import { Route, Routes} from "react-router-dom";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Main from "./component/common/Main";
import MemberJoin from "./component/member/MemberJoin";
import MemberLogin from "./component/member/MemberLogin";
import MemberMain from "./component/member/MemberMain.jsx";

function App() {
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
