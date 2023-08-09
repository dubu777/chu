import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = "http://localhost:9090/api"

// 이미지 첨부 api
export const attachCustomerImage = async(seq, formData) => {
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
};

// const response = await axios.post(`${Test_URL}/customer/detail/img/${seq}`, {    
//     "img" : formData,


// 고객 마이페이지 조회
export const getCustomerMyPage = async (customerSeq)=> {
    try {
        const response = await axios.get(`${BASE_URL}/customer/detail/mypage/${customerSeq}`)
        return response.data.result;
    } catch(error) {
        throw new Error('고객 마이페이지 API 요청 실패')
    }

};

// 로그인시 유저 데이터 받아옴
export const getCustomerLogInData = async (customerSeq) => {
    try {
        const response = await axios.get(`${BASE_URL}/customer/main/${customerSeq}`)
        return response.data.result
    } catch(error) { 
        throw new Error('로그인시 가져올 데이터 조회 실패')
    }

};