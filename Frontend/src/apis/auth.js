import axios from 'axios';

const BASE_URL = 'http://localhost:9000/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/sign-in`, {
      "id" : username,
      "pwd" : password,
    });
    // 서버로부터 받은 토큰을 반환
    return {
      accessToken: response.data.result.token.accessToken,
      refreshToken: response.data.result.token.refreshToken,
      logInData: response.data.result
    };
  } catch (error) {
    throw new Error('로그인 실패');
  }
};