import axios from "axios";

// 서버 url
// const BASE_URL = 'https://i9b111.q.ssafy.io/api';
const BASE_URL = "http://localhost:9090/api";

// 이미지 첨부 api
export const attachCustomerImage = async (seq, formData) => {
  try {
    console.log("try문 진입");
    const response = await axios.patch(
      `${BASE_URL}/customer/detail/img/${seq}`,
      formData,
      {
        headers: {
          // Origin: 'http://localhost:3000',
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("성공");
    return response.data;
  } catch (error) {
    throw new Error("이미지 보내기 실패");
  }
};

// const response = await axios.post(`${Test_URL}/customer/detail/img/${seq}`, {
//     "img" : formData,

// 고객 마이페이지 조회(최근 상담 내역 포함)
export const getCustomerMyPage = async (customerSeq) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customer/detail/mypage/${customerSeq}`
    );
    return response.data.result;
  } catch (error) {
    throw new Error("고객 마이페이지 API 요청 실패");
  }
};

// 고객 마이페이지(좋아요한 디자이너)
export const getLikeDesignerList = async (customerSeq) => {
    try {
        const response = await axios.get(`${BASE_URL}/customer/like/${customerSeq}`)
        return response.data.result;
    } catch (error) {
        throw new Error("좋아요한 디자이너 API 요청 실패", error)
    }
}


// 고객 로그인시 데이터
export const getCustomerLogInData = async (customerSeq) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customer/main/${customerSeq}`
    );
    return response.data.result;
  } catch (error) {
    throw new Error("고객 로그인 데이터 요청 실패");
  }
};

// 고객 회원 정보 수정 페이지 조회
export const getCustomerEditData = async (customerSeq) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customer/detail/${customerSeq}`
    );
    console.log(response.data.result, "되냐? 유저정보조회 됐다");
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 리스트 조회 실패");
  }
};

// 고객 회원 정보 수정
export const changePassword = async (customerSeq, requestData) => {
  try {
    // const endpoint = `${BASE_URL}/customer/detail/${customerSeq}`;
    // const body = {
    //   requestData
    // };
    // const response = await axios.put(endpoint, body);
    const response = await axios.put(
      `${BASE_URL}/customer/detail/${customerSeq}`, {
        requestData
      }
    );
    console.log("정보 수정 제발!!!!!!!!!", requestData);
    return response.data.result;
    
  } catch (error) {
    throw new Error('회원 정보 수정 실패')
  }
};
