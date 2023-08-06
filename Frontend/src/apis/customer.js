import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';
const Test_URL = "http://localhost:9090/api"

// 이미지 첨부 api
export const attachImage = async(seq, formData) => {
    try {
        console.log("try문 진입")
        const response = await axios.patch(`${Test_URL}/customer/detail/img/${seq}`, formData, {
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
export const customerPage = async(seq)=> {
    try {
        const response = await axios.get(`${BASE_URL}/customer/detail/mypage/${seq}`, {
            // params : {"customerSeq" : 1}
        })
        return response.data.result
    } catch(error) {
        throw new Error('디자이너 리스트 조회 실패')
    }

};