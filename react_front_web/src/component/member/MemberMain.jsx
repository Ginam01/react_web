import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MemberMain = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [member,setMember] = useState(null); //마이페이지에서 사용할 로그인 저장

    useEffect(()=> {
        axios.get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`,{
        })
        .then((res)=> {
            console.log(res);
            setMember(res.data);
            
        }).catch((err)=> {
            console.log(err);
        })


    },[])
    /*
    const isLogin = useRecoilValue(isLoginState);// return된 데이터를 바로줌
    const navigate = useNavigate();
    if(!isLogin){
        Swal.fire({
            title: "로그인을 해주세요!",
            icon: "info"
        }).then(() => { //swal 이 뜨고 then함수가 돌아감 안할시 페이지에 머물러져있음
            navigate("/member/login");
        });

    }else{

    }
*/

    return(
    <div className="mypage-wrap">
        <h3>마이페이지</h3>
        

    </div>
);
};

export default MemberMain;