import axios from "axios";


// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = "http://localhost:9090/api";

// 예약페이지-상담 가능 시간 조회
export const getPossibleTimeApi = async (designerSeq) => {
    try {
        // console.log('try진입!!');
        const response = await axios.get(
          `${BASE_URL}/designer/date/${designerSeq}`, {
          params: {
            date : "2023-08-02"
          },
    });
        return response.data.result;
      } catch (error) {
        throw new Error("예약 리스트 조회 실패;;;");
      }
}

// 예약페이지-디자이너 포트폴리오 이미지 조회
export const getPortfolioShow = async (designerSeq) => {
  console.log('누구이', designerSeq)
  try {
      console.log('포폴 try진입!!');
      const response = await axios.get(
        `${BASE_URL}/designer/reservation/${designerSeq}`, 
      );
      return response.data.result;
    } catch (error) {
      throw new Error("예약페이지 포트폴리오 조회 실패;;;");
    }
}

// 예약 정보 보내기 
export const postReserveInfo = async(info) => {
  console.log('넘어온 정보 확인',info)
  try{
    const response = await axios.post(
      `${BASE_URL}/consulting`, info
    );
      return response.data.result;

  } catch(error) {
    throw new error('예약 정보 보내기 실패')
  }
}

// 예약 정보 이미지 보내기
export const postReserveImg = async (consultingSeq, formData) => {
  try { 
    console.log("try문 진입");
    const response = await axios.post(
      `${BASE_URL}/consulting/img/${consultingSeq}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log('사진 정보',response.data)
    return response.data.result;
  } catch (error) {
    throw new Error("이미지 보내기 실패");
  }
};