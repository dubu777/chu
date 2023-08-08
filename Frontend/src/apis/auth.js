import axios from 'axios';

const BASE_URL = 'https://i9b111.q.ssafy.io:9090/api';
//const BASE_URL = 'http://localhost:9090/api';

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

export const login2 = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/sign-in`, {
      "id" : username,
      "pwd" : password
    });
    return response.data.result;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};

export const findId = async (username, useremail) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/find-id`,{
      params: {
        name: username,
        email: useremail
      },
      headers:{
        'Content-Type': 'text/plain'
      }
    });
    return response.data.result;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};
