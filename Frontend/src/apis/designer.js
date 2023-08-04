import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';


// 디자이너 리스트 뷰 api
export const listinfo = async(seq)=> {
    try {
        const response = await axios.get(`${BASE_URL}/designer/search/review-score`, {
            params : {"customerSeq" : 1}
        })
        return response.data.result
    } catch(error) {
        throw new Error('디자이너 리스트 조회 실패')
    }

};