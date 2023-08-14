import axios from 'axios';

const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = 'http://localhost:9090/api';

// 결제 준비
export const kakaoPayReady = async () => {

    try{
        const response = await axios.post(`${BASE_URL}/kakaoPay`);
        //console.log(response.data.result);
        return response.data;
    } catch (error){
        throw error;
    }
};


// 결제 정보
export const kakaoPayInfo = async (pg_token) => {

    try{
        const response = await axios.get(`${BASE_URL}/paySuccess`, { params : {
            "pg_token": pg_token
        }});
        return response.data.result;
    } catch(error){
        throw error;
    }
}

// 카카오맵 API
export const getDesignerInfo = async () => {
    try{
        
        const response = await axios.get(`${BASE_URL}/designer/search/around`);
        console.log('try 진입성공',response.data.result)
        return response.data.result
    } catch(error){
        throw error;
    }
}
