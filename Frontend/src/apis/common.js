import axios from "axios";

// const BASE_URL = "https://i9b111.q.ssafy.io/api";
const BASE_URL = 'http://localhost:9090/api';

//메인 페이지 요청(비로그인)
export const fetchMain = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/main`);
    return response.data.result;
  } catch (error) {
    throw new Error("메인페이지 데이터 통신 에러");
  }
};

//메인 페이지 요청(고객)
export const customerMain = async (customerSeq) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customer/main/${customerSeq}`
    );
    // 서버로부터 받은 토큰을 반환
    return response.data.result;
  } catch (error) {
    throw new Error("메인페이지 고객 데이터 에러");
  }
};

//메인 페이지 요청(디자이너))
export const designerMain = async (designerSeq) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/designer/main/${designerSeq}`
    );
    // 서버로부터 받은 토큰을 반환
    return response.data.result;
  } catch (error) {
    throw new Error("메인페이지 디자이너 데이터 에러");
  }
};

// 좋아요 버튼 클릭
export const toggleLikeButton = async ({designerSeq, customerSeq, isLike}) => {
  console.log("좋아요 버튼 클릭",designerSeq, customerSeq, isLike);
  try {
    const response = await axios.post(`${BASE_URL}/customer/like`, {
      "customerSeq": customerSeq,
      "designerSeq": designerSeq,
      "isLike": isLike,
    });
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error("좋아요 버튼 클릭 실패", error);
  }
};
