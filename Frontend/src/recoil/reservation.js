import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = "http://localhost:9090/api";


export const getPossibleTimeApi = async (designerSeq) => {
    try {
        const response = await axios.get(
          `${BASE_URL}/designer/date/${designerSeq}`
        );
        return response.data.result;
      } catch (error) {
        throw new Error("고객 마이페이지 API 요청 실패");
      }
}

