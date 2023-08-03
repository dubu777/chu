import axios from 'axios';

const BASE_URL = 'http://your-backend-server-url.com/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    // 서버로부터 받은 토큰을 반환
    return response.data.accessToken;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};