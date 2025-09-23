import { useState } from "react";
import BoardFrm from "./BoardFrm";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import TextEditor from "../utils/TextEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
    //글 작성 입력받기위한 데이터를 저장하기위해 state 선언
    const [boardTitle,setBoardTitle] = useState(""); //제목
    const [thumbnail, setThumnail] = useState(null); //null을 넣는 이유는 문자열이 아닌 file이여서
    const [boardFile, setBoardFile] = useState([]); // 게시물 첨부파일
    const [boardContent, setBoardContent] = useState(""); //게시물 본문
    const [memberId, setMemberId] = useRecoilState(loginIdState); //라코일에서 아이디 받아와서 

    const naviage = useNavigate();
    const write = () => {
        if(boardTitle !== "" && boardContent !== ""){
            const form = new FormData();
            form.append("boardTitle",boardTitle);
            form.append("boardContent",boardContent);
            form.append("boardWrite",memberId);
            //썸네일은 첨부파일이 추가한 경우에만 추가
            if(thumbnail !== null){
                form.append("thumbnail", thumbnail);
            }
            //첨부파일도 추가한 경우에만 전송에 추가
            for(let i=0; i<boardFile.length; i++){
                form.append("boardFile",boardFile[i]);
            }
            axios.post(`${import.meta.env.VITE_BACK_SERVER}/board`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res)=>{
                if(res.data > 0){
                    naviage("/board/list");
                }

            }).catch((err)=>{

            })
        }
    }
    return(
        <section className="section board-content-wrap">
            <div className="page-title">게시글 작성</div>
            <div className="board-frm">
                <BoardFrm 
                boardTitle={boardTitle} setBoardTitle={setBoardTitle}
                thumbnail={thumbnail} setThumnail={setThumnail}
                boardFile={boardFile} setBoardFile={setBoardFile}
                />
            <div className="board-content-wrap">
                <TextEditor data={boardContent} setData={setBoardContent} />
            </div>
            <div className="button-zone">
                <button type="button" className="btn-primary lg" onClick={write}>
                    등록하기
                </button>
                </div>
            </div>
        </section>
    );
};

export default BoardWrite;