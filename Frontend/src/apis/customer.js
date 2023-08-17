import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = "http://localhost:9090/api";

// 이미지 첨부 api
export const attachCustomerImage = async (seq, formData) => {
  try {
    console.log("try문 진입");
    const response = await axios.post(
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
    return response.data.result;
  } catch (error) {
    throw new Error("이미지 보내기 실패");
  }
};

// const response = await axios.post(`${Test_URL}/customer/detail/img/${seq}`, {
//     "img" : formData,

// 고객 마이페이지 조회(최근 상담 내역 포함)
export const getCustomerMyPage = async (customerSeq) => {
  try {
    console.log('고객마이페이지')
    const response = await axios.get(
      `${BASE_URL}/customer/detail/mypage/${customerSeq}`
    );

    if(response.data.result.img == null){
      response.data.result.img = 'profile2.png';
    }

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
    const response = await axios.put(
      `${BASE_URL}/customer/detail/${customerSeq}`,requestData);
    console.log("정보 수정 제발!!!!!!!!!", requestData);
    return response.data.result;
    
  } catch (error) {
    throw new Error('회원 정보 수정 실패')
  }
};


// 고객 알림 조회
export const getCustomerNotification = async (userSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/alert/${userSeq}`)
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error("고객 알림 조회 실패", error)
  }
}

// 고객 알림 읽음 처리
export const readCustomerNotification = async (alertSeq) => {
  try {
    const response = await axios.put(`${BASE_URL}/customer/alert/${alertSeq}`)
    console.log(response.data.status);
    return response.data.status;
  } catch (error) {
    throw new Error("고객 알림 조회 실패", error)
  }
}

// 고객 상담 만족도 조사 모달
export const sendSurvey = async (requestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/consulting/review`, requestData)
    console.log(requestData,"만족도 조사 리퀘스트 데이터");
    console.log(response.data.status);
    return response.data.status;
  } catch (error) {
    throw new Error ("만족도 조사 실패", error)
  }
}