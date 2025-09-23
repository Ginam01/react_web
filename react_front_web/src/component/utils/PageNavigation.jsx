const PageNaviGation = (props) => {
    const pi = props.pi;
    const reqPage = props.reqPage;
    const SetReqPage = props.SetReqPage;

    const arr = new Array();
    //맨 앞페이지 이모티콘
    arr.push(
        <li key="first-page">
            <span className="material-icons page-item" onClick={()=> {
                SetReqPage(1);
            }}>keyboard_double_arrow_left</span>
        </li>
        
    );
    //전 페이지 이모티콘
    arr.push(
        <li key="prev-page">
            <span className="material-icons page-item" onClick={()=>{
                if( reqPage !== 1){
                    SetReqPage(reqPage -1);
                }
            }}>navigate_before</span>
        </li>
    );
    //페이지 숫자
    let pageNo = pi.pageNo;
    for(let i=0; i<pi.pageNaviSize;i++){
        arr.push(
            <li key={"page-"+i}>
                <span className={pageNo === reqPage ? "page-item active-page":"page-item"}
                onClick={(e)=>{
                    const pageNumber = e.target.innerText;
                    SetReqPage(pageNumber);
                }}
                >
                {pageNo}</span>
            </li>
        )
        pageNo++;
        if(pageNo > pi.totalPage){
            break;
        }
    };

    //다음 페이지
    arr.push(
        <li key="next-page">
            <span className="material-icons page-item" onClick={()=>{
                if( reqPage < pi.totalPage){
                    SetReqPage(reqPage +1);
                }
            }}>navigate_next</span>
        </li>
    );
    //제일 뒤 페이지
    arr.push(
        <li key="last-page">
            <span className="material-icons page-item" onClick={()=> {
                SetReqPage(pi.totalPage);
            }}>keyboard_double_arrow_right</span>
        </li>
    );
    return(
        <ul className="pagenation">{arr}</ul>
    )

}

export default PageNaviGation;