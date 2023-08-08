import axios from "axios";
import { async } from "q";
import { loginState } from "../recoil/auth";
// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';
// const BASE_URL = "http://localhost:9090/api"

// 디자이너 리스트 뷰 api
export const listinfo = async (seq) => {
  try {
    const customerSeq = loginState ? seq : 0;
    const response = await axios.get(
      `${BASE_URL}/designer/search/review-score`,
      {
        params: { customerSeq: customerSeq },
      }
    );
    console.log("리스트 뷰 데이터 가져오기 성공");
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error("데이터 못가져옴");
  }
};
//디테일 페이지
export const getDesignerDetail = async (designerSeq, customerSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/search/detail/${designerSeq}`, 
    { params: { customerSeq }});
    console.log(">>>>>>>>>>>>", response.data.result)
    return response.data.result;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error.message);
    throw error;
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
    throw new Error("데이터 못가져옴");
  }
};

// 디자이너 프로필 사진 등록 api
export const attachDesignerImage = async (seq, formData) => {
  try {
    console.log("try문 진입");
    const response = await axios.post(
      `${BASE_URL}/customer/detail/img/${seq}`,
      formData,
      {
        headers: {
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

// 마이페이지-포트폴리오 조회
export const getPortfolio = async (seq) => {
  console.log('seq',seq)
  try {
    console.log("포트폴리호 조회 try");
    const response = await axios.get(`${BASE_URL}/designer/detail/portfolio/${seq}`);
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 조회 실패");
  }
};

// 마이페이지-포트폴리오 등록
export const postPortfolio = async (seq, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/designer/detail/portfolio/${seq}`,
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
    throw new Error("디자이너 포트폴리오 등록 실패");
  }
};

// 마이페이지-포트폴리오 삭제
export const deletePortfolio = async (seq, imgSeq) => {
  console.log(seq, imgSeq);
  try {
    const response = await axios.delete(
      `${BASE_URL}/designer/detail/portfolio/${seq}`,
      {
        params: { imgSeq: imgSeq },
      }
    );
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 삭제 실패");
  }
};
