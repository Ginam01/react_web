//Recoil 모든 범위에 state 선언
//로그인 관련 > App.jsx 에서 생성 하고 필요한 부분에 하위컴포넌트로 전달

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//회원 아이디를 저장하는 저장소(atom)
const {persistAtom} = recoilPersist();

const loginIdState = atom({
    key:"loginIdState" ,//키값
    default:"", //최초의 세팅(초기값) : null ""(빈문자열) 둘다 상관X
    effects_UNSTABLE:[ persistAtom], //이 기능을 사용하면 브라우저에 데이터를 저장해서 새로고침하면 브라우저에서 새로운 데이터를 꺼내옴

});

//회원 타입을 저장하는 저장소
const memberTypeState = atom({
    key: "memberTypeState",
    default: 0,
    effects_UNSTABLE:[persistAtom],
});

//selector : atom으로 생성한 데이터를 이용해서 함수를 실행하고 결과를 리턴
const isLoginState = selector({
    key : "isLoginState",
    get : (state) =>{
        //매개변수 state는 recoil에 저장된 데이터를 불러오기 위한 객체
        const loginId = state.get(loginIdState);
        const memberType = state.get(memberTypeState);
        //현재 state가 로그인 기준을 잡아줌
        return loginId !== "" && memberType !== 0;

    },


});

export { loginIdState, memberTypeState, isLoginState};