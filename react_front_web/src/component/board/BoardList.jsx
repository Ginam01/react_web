import axios from "axios";
import { useEffect, useState } from "react";
import "./Board.css";
import PageNaviGation from "../utils/PageNavigation";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { isLoginState } from "../utils/RecoilData";

const BoardList = () => {
    const[boardList, setBoardList] = useState([]);
    const[reqPage, SetReqPage] = useState(1);
    const[pi, SetPi]= useState(null);
    const isLogin = useRecoilValue(isLoginState);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACK_SERVER}/board?reqPage=${reqPage}`)
        .then((res)=> {
            setBoardList(res.data.boardList);
            SetPi(res.data.pi);

        }).catch((err)=> {
            console.log(err);
        })
    },[reqPage]);

    return(
        <section className="section board-list">
            <div className="page-title">자유게시판</div>
            {isLogin && <Link to="/board/write" className="btn-primary">글쓰기</Link>}
            <div className="board-list-wrap">
                <ul className="posting-wrap">
                    {boardList.map((board,index)=>{
                        return <BoardItem key={"board-" + index} board={board}/>;

                    })}
                </ul>
                    <div className="board-paging-wrap">
            {pi !== null && (
                <PageNaviGation pi={pi} reqPage={reqPage} SetReqPage={SetReqPage} />
            )}
            </div>
        </div>
        </section>
    );
};

const BoardItem = (props) =>{
    const board = props.board;
    return(
        <li className="posting-item">
            <div className="posting-img">
                <img 
                src={
                    board.boardThumb !== null
                    ? `${import.meta.env.VITE_BACK_SERVER}/board/thumb/${
                        board.boardThumb
                    }`
                    : "/image/default_img.png"
                } 
                ></img>
            </div>
            <div className="posting-info">
                <div className="posting-title">{board.boardTitle}</div>
                <div className="posting-sub-info">
                    <span>{board.boardWriter}</span>
                    <span>{board.boardDate}</span>
                </div>
            </div>
        </li>
    )
}

export default BoardList;