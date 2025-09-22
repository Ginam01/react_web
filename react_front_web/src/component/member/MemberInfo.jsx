import { useRecoilState } from "recoil";
import { authReadyState, loginIdState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";

const MemberInfo = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [member, setMember] = useState(null);
    const [authReady, setAuthReady] = useState(authReadyState);

    useEffect(()=> {
        if (!authReady){
            return;
        }
        axios.get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            setMember(res.data);
        
        }).catch((err)=>{

        });
    },[]);
    return(
        <div>
            <div className="page-title">내 정보</div>
            {member !== null(
                            <form onSubmit={(e)=>{
                e.preventDefault();
            }}
            >
                <table className="tbl my-info">
                <tbody>
                    <tr>
                        <th style={{width : "20%"}}>아이디</th>
                        <th className="left">{member.memberId}</th>
                    </tr>
                </tbody>
                </table>
            </form>
            )}
        </div>
    );
};
export default MemberInfo;