import axios from "axios";

// 서버 url
const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = "http://localhost:9090/api";


export const getPossibleTimeApi = async (designerSeq) => {
    try {
        console.log('try진입!!');
        const response = await axios.get(
          `${BASE_URL}/designer/date/1`, {
          params: {
            date : "2023-08-02"
          },
    });
        return response.data.result;
      } catch (error) {
        throw new Error("예약 리스트 조회 실패;;;");
      }
}
