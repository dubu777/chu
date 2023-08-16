import axios from "axios";
import { loginState } from "../recoil/auth";
// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
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
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error.message);
    throw error;
  }
};
// 디자이너 마이페이지
export const getDesignerMyPage = async (designerSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/detail/mypage/${designerSeq}`);

    if(response.data.result.img == null){
      response.data.result.img = 'profile2.png';
    }

    return response.data.result;
  } catch (error) {
    console.error('디자이너 마이페이지 데이터 요청 실패', error.message);
    throw error;
  }
};

// 디자이너 한 줄 소개글 수정
export const updateIntroduction = async (designerSeq, introduction) => {
  try{
    console.log(designerSeq);
    console.log(introduction);
    const response = await axios.patch(`${BASE_URL}/designer/detail/introduction/${designerSeq}?introduction=${introduction}`, 

    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("소개글 데이터 요청 실패");
  }
};

// 디자이너 회원 정보 변경 조회
export const getDesignerEditData = async (designerSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/detail/${designerSeq}`)
    console.log("정보 수정 조회 제발!!!!!!!!!", response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error("회원 정보 변경 조회 요청 실패");
  }
}

// 디자이너 회원 정보 변경
export const changeDesignerData = async (designerSeq, requestData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/designer/detail/${designerSeq}`, requestData);
    console.log("정보 수정 변경 제발!!!!!!!!!", designerSeq, requestData);
    return response.data.result;    
  } catch (error) {
    throw new Error('회원 정보 수정 실패')
  }
};

// 디자이너 프로필 사진 등록 api
export const attachDesignerImage = async (seq, formData) => {
  try { 
    console.log("try문 진입");
    const response = await axios.post(
      `${BASE_URL}/designer/detail/img/${seq}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log('사진 정보',response.data.result)
    console.log('사진 정보',response.data)
    return response.data.result;
  } catch (error) {
    throw new Error("이미지 보내기 실패");
  }
};

// 디자이너 상담 캘린더
export const postReserveCalendar = async (designerSeq, selectedTimes) => {
  try { 
    console.log("try문 진입");
    console.log("try 시간 보여?", selectedTimes)
    const response = await axios.post(`${BASE_URL}/designer/detail/time/${designerSeq}`, {
     "dateAndTimes" : selectedTimes,
    });
    console.log('캘린더 정보',response.data)
    return response.data.result;

  } catch (error) {
    throw new Error("상담 캘린더 보내기 실패");
  }
};



// 디자이너 모든 예약 내역 조회(마이페이지 탭2)
export const getAllReserveList = async (designerSeq) => {
  try {
    console.log('trytry')
      // const response = await axios.get(`${BASE_URL}/designer/detail/reservation-list/${designerSeq}`)
      const response = await axios.get(`${BASE_URL}/designer/detail/reservation-list/${designerSeq}`)
      console.log('응답몬', response.data);
      return response.data.result;
  } catch(error) {
      throw new Error('디자이너 상담 예약목록 API 요청 실패')
  }

};

// 마이페이지-포트폴리오 조회
export const getPortfolio = async (seq) => {
  console.log('seq',seq)
  try {
    console.log("포트폴리오 조회 try");
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
  console.log('보냈ㄷ자나', seq, imgSeq);
  try {
    const response = await axios.delete( 
      `${BASE_URL}/designer/detail/portfolio/${seq}`,
      {
        params: { "imageSeq": imgSeq },
      }
    );
    console.log('성공결과가 뭐야?', response.data.status)
    // result 없음 주의!
    return response.data.status;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 삭제 실패");
  }
};

// 디자이너 알림 조회
export const getDesignerNotification = async (userSeq) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/alert/${userSeq}`)
    console.log(response.data.result, "디자이너 알림 조회");
    console.log(response.data.status);
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 알림 조회 실패", error)
  }
}

// 디자이너 알림 읽음 처리
export const readDesignerNotification = async (alertSeq) => {
  try {
    const response = await axios.put(`${BASE_URL}/designer/alert/${alertSeq}`)

    console.log(response.data.status, "디자이너 알림 읽기");
    return response.data.status;
  } catch (error) {
    throw new Error("디자이너 알림 읽기 실패", error)
  }
}