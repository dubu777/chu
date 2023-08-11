import axios from "axios";

const BASE_URL = "https://i9b111.q.ssafy.io/api";
// const BASE_URL = 'http://localhost:9090/api';

//메인 페이지 요청(비로그인)
export const fetchMain = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/main`);
    console.log("비로그인");
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
    console.log("고객 로그인");
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
    console.log("디자이너 로그인");
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


// 디자이너 리스트 뷰 스타일 필터 api
export const submitStyleFilter = async (hairStyleSeqNumbers) => {
  try {
    console.log("스타일 try문 진입");
    const hairStyleSeqs = hairStyleSeqNumbers.join(",");
    const response = await axios.get(`${BASE_URL}/designer/search/filter`, {
      params: {
        hairStyleSeqs: hairStyleSeqs,
        customerSeq: 1,
      },
    });
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error("스타일 필터 요청 실패", error);
  }
};

// 이름으로 검색
export const searchDesigner = async (name, userSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/search/name`, {
      params: {
        "name": name,
        "customerSeq": userSeq,
      }})
      console.log("이름으로 검색 되나? 됐다!", response.data.result);
      return response.data.result;
  } catch (error) {
    throw new Error("이름으로 검색 요청 실패", error)
  }
}

// 알림 생성
export const createNotification = async (consultingSeq, userType) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/alert`, {
      "consultingSeq": consultingSeq,
      "userType": userType,
    })
    return response.data.result;
  } catch (error) {
    throw new Error("알림 생성 실패", error)
  }
}