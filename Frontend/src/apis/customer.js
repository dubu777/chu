import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';


// 이미지 첨부 api
// export const attachImage = async(seq, formData)=> {
//     try {
//         const response = await axios.patch(`${BASE_URL}/customer/detail/img/${seq}`, {
//            "img" : formData,
//            headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//         })
//         return response.data.result;
//     } catch(error) {
//         throw new Error('이미지 보내기 실패')
//     }
// };


export const attachImage = async (seq, formData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/customer/detail/img/${seq}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.result;
    } catch (error) {
        throw new Error('이미지 보내기 실패');
    }
};