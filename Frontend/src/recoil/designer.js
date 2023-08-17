import { atom } from "recoil";

// 디자이너 리스트 atom
export const listViewState = atom({
    key: "listViewState",
    default: null,
})

// 디자이너 마이페이지 조회 atom
export const designerMyPageState = atom({
    key: "designerMyPageState",
    default: null,
})