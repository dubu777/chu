import axios from 'axios';

const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';
// const BASE_URL = 'http://localhost:9090/api';

//메인 페이지 요청
export const fetchMain = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/main`);
    // 서버로부터 받은 토큰을 반환
    return response.data.result;
  } catch (error) {
    throw new Error('메인페이지 데이터 통신 에러');
  }
};
