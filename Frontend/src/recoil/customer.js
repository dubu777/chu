import { atom } from "recoil";

export const formDataState = atom({
    key: "formDataState",
    default: null,
})

//고객 로그인 atom
export const customerLogInDataState = atom({
    key: 'customerLogInDataState',
    default: null,
});