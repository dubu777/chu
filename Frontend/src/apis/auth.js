import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/sign-in`, {
      "id" : username,
      "pwd" : password
    });
    // 서버로부터 받은 토큰을 반환
    return response.data.result.token.accessToken;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};