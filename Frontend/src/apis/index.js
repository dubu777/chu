import axios from 'axios';



const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = 'http://localhost:9090/api';

//토큰이 필요한 api요청을 보내는 axios인스턴스
const getPersistedAccessToken = () => {
  const persistedRecoilState = JSON.parse(localStorage.getItem('recoil-persist'));
  return persistedRecoilState ? persistedRecoilState.accessTokenState : null;
};

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
});

privateApi.interceptors.request.use(config => {
  const token = getPersistedAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


//re-export
export * from './auth';
export * from './common';
export * from './customer';
export * from './designer';
export * from './post';
export * from './reservation';
export * from './rootUrl';