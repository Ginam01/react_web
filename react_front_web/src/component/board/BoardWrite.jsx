import { useState } from "react";
import BoardFrm from "./BoardFrm";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const BoardWrite = () => {
    //글 작성 입력받기위한 데이터를 저장하기위해 state 선언
    const [boardTitle,setBoardTitle] = useState(""); //제목
    const [thumbnail, setThumnail] = useState(null); //null을 넣는 이유는 문자열이 아닌 file이여서
    const [boardFile, setBoardFile] = useState([]); // 게시물 첨부파일
    const [boardContent, setBoardContent] = useState(""); //게시물 본문
    const [memberId, setMemberId] = useRecoilState(loginIdState); //라코일에서 아이디 받아와서 

    return(
        <section className="section board-content-wrap">
            <div className="page-title">게시글 작성</div>
            <div className="board-frm">
                <BoardFrm 
                boardTitle={boardTitle} setBoardTitle={setBoardTitle}
                thumbnail={thumbnail} setThumnail={setThumnail}
                boardFile={boardFile} setBoardFile={setBoardFile}
                />
            </div>
        </section>
    );
};

export default BoardWrite;