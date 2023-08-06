import axios from "axios";
import { async } from "q";

// 서버 url
// const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';
const BASE_URL = "http://localhost:9090/api"


// 디자이너 리스트 뷰 api
export const listinfo = async(seq)=> {
    try {
        const response = await axios.get(`${BASE_URL}/designer/search/review-score`, {
            params : {"customerSeq" : 1}
        })
        return response.data.result
    } catch(error) {
        throw new Error('데이터 못가져옴')
    }

};

// 디자이너 프로필 이미지 첨부 api
export const attachDesignerImage = async(seq, formData) => {
    try {
        console.log("try문 진입")
        const response = await axios.patch(`${BASE_URL}/customer/detail/img/${seq}`, formData, {
            headers: {
                // Origin: 'http://localhost:3000',
                'Content-Type': 'multipart/form-data'
            },
        });
        console.log("성공")
        return response.data;
    } catch (error) {
        throw new Error('이미지 보내기 실패');
    }
    // if (response.status === 200) {
    //     console.log("이미지가 성공적으로 첨부되었습니다.");
    //   } else {
    //     console.log("이미지 첨부 실패:", response.status);
    //   }
    // } catch (error) {
    //   console.error("API 요청 실패:", error);
    // }
};

// 마이페이지-포트폴리오 조회
export const getPortfolio = async(seq) => {
    try {
        const response = await axios.get(`${BASE_URL}/designer/detail/portfolio/${seq}`, {
        })
        return response.data.result
    } catch(error) {
        throw new Error('디자이너 포트폴리오 조회 실패')
    }
};

// 마이페이지-포트폴리오 등록
export const postPortfolio = async(seq, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/designer/detail/portfolio/${seq}`, formData,{
            headers: {
                // Origin: 'http://localhost:3000',
                'Content-Type': 'multipart/form-data'
            },
        });
        console.log("성공")
        return response.data
    } catch(error) {
        throw new Error('디자이너 포트폴리오 등록 실패')
    }
};

// 마이페이지-포트폴리오 삭제
export const deletePortfolio = async(seq, imgSeq) => {
    console.log(seq, imgSeq)
    try {
        const response = await axios.delete(`${BASE_URL}/designer/detail/portfolio/${seq}`, {
            params : {"imgSeq" : imgSeq}
        })
        return response.data.result
    } catch(error) {
        throw new Error('디자이너 포트폴리오 삭제 실패')
    }
};