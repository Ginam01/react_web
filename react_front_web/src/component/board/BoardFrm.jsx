import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import DeleteIcon from '@mui/icons-material/Delete';

const BoardFrm = (props) => {
    const boardTitle = props.boardTitle;
    const setBoardTitle = props.setBoardTitle;
    const thumbnail = props.thumbnail;
    const setThumnail = props.setThumnail;
    const boardFile = props.boardFile;
    const setBoardFile = props.setBoardFile;

    const [memberId, setMemberId] = useRecoilState(loginIdState);
    //섬네일 화면 출력용
    const [showThumb, setShowThumb] = useState(null);
    //첨부파일 화면 출력용
    const [showFileList, setShowFileList] = useState([]);

    const thumRef = useRef(null);
    //섬네일 이미지 변경 시 동작하는 함수
    const changeThumnail = (e) => {
        const files = e.target.files;
        if(files.length !== 0){
            //1. 글 작성 시 파일을 전송하기위한 파일객체 저장
            setThumnail(files[0]);
            //2. 화면 미리보기 설정
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () =>{
                setShowThumb(reader.result);
            }
        }else{
            setThumnail(null);
            setShowThumb(null);
        }
    };
    const addBoardFile= (e) => {
        const files = e.target.files;
        console.log(files)

        const fileArr = new Array();//글 작성 시 전송할 파일객체들을 저장하기위한 배열
        const fileNameArr = new Array(); // 화면에서 파일이름을 출력하기 위한 배열
        for(let i=0; i<files.length; i++){
            fileArr.push(files[i]);
            fileNameArr.push(files[i].name);
        }
        setBoardFile([...boardFile, ...fileArr]);
        setShowFileList([...showFileList, ...fileNameArr]);
    };

    return(
        <div>
        <div className="board-thumb-wrap">
            {showThumb === null ? (
            <img src="/image/default_img.png" onClick={()=>{ thumRef.current.click(); }} />
        ) : (
            <img src={showThumb} onClick={()=> { thumRef.current.click(); }} />
        )}
            
            <input ref={thumRef} type="file" accept="image/*" style={{display:"none"}} onChange={changeThumnail}></input>
        </div>
        <div className="board-info-wrap">
            <table className="tbl">
                <tbody>
                    <tr>
                        <th style={{width: "30%"}}>
                            <label htmlFor="boardTitle">제목</label>
                        </th>
                        <td>
                            <div className="input-item">
                                <input type="text" id="boardTitle" name="boardTitle" value={boardTitle} onChange={(e)=>{
                                    setBoardTitle(e.target.value);
                                }}>
                                </input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td className="left">{memberId}</td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td className="left">
                            <input type="file" id="boardFile" style={{display :"none"}} multiple onChange={addBoardFile} /> 
                            <label htmlFor="boardFile" className="btn-primary sm">
                                파일첨부
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일 목록</th>
                        <td>
                            <div className="board-file-wrap">
                                {showFileList.map((filename,i)=>{
                                    const deleteFile = () =>{
                                        const newFileList = showFileList.filter((item,index)=>{
                                            return index !== i;
                                        });
                                        setShowFileList(newFileList);
                                        const newBoardFile = boardFile.filter((item, index)=> {
                                            return index !== i;
                                        });
                                        setBoardFile(newBoardFile);
                                    };
                                    return(
                                        <p key={"file-"+i}>
                                            <span className="filename">{filename}</span>
                                            <DeleteIcon onClick={deleteFile}/>
                                        </p>
                                    );
                                })}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
};

export default BoardFrm;