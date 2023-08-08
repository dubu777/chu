// import axios from "axios";

// export const listinfo = async(seq)=> {
//     try {
//         const response = await axios.get('http://localhost:9090/api/designer/search/review-score',{
//             "customerSeq" : seq
//         })
//         return response.data.result
//     } catch(error) {
//         throw new Error('데이터 못가져옴')
//     }

// };
   
import axios from "axios";

export const listinfo = async(seq)=> {
    try {
        const response = await axios.get(`https://i9b111.q.ssafy.io:9090/api/designer/search/review-score`, {
            params : {"customerSeq" : 1}
        })
        return response.data.result
    } catch(error) {
        throw new Error('데이터 못가져옴')
    }

<<<<<<< Updated upstream
};
=======
// 디자이너 프로필 사진 등록 api
export const attachDesignerImage = async (seq, formData) => {
  try {
    console.log("try문 진입");
    const response = await axios.post(
      `${BASE_URL}/customer/detail/img/${seq}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("성공");
    return response.data;
  } catch (error) {
    throw new Error("이미지 보내기 실패");
  }
};

// 마이페이지-포트폴리오 조회
export const getPortfolio = async (seq) => {
  console.log('seq',seq)
  try {
    console.log("포트폴리호 조회 try");
    const response = await axios.get(`${BASE_URL}/designer/detail/portfolio/${seq}`);
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 조회 실패");
  }
};

// 마이페이지-포트폴리오 등록
export const postPortfolio = async (seq, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/designer/detail/portfolio/${seq}`,
      formData,
      {
        headers: {
          // Origin: 'http://localhost:3000',
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("성공");
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 등록 실패");
  }
};

// 마이페이지-포트폴리오 삭제
export const deletePortfolio = async (seq, imgSeq) => {
  console.log(seq, imgSeq);
  try {
    const response = await axios.delete(
      `${BASE_URL}/designer/detail/portfolio/${seq}`,
      {
        params: { imgSeq: imgSeq },
      }
    );
    return response.data.result;
  } catch (error) {
    throw new Error("디자이너 포트폴리오 삭제 실패");
  }
};
>>>>>>> Stashed changes
