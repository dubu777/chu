import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { kakaoPayInfo } from "../../apis/kakao";
import { useNavigate } from "react-router";
import { useRecoilState } from 'recoil';
import {reserveInfo, imgFileState} from "../../recoil"
import {getPossibleTimeApi, getPortfolioShow, postReserveImg, postReserveInfo } from "../../apis"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;
  margin-top: 60px;
`;
const SuccessBox = styled.div`
  display: flex;

`;

const Text = styled.span`
  font-size: 20px;
  font-weight: 600;
`;


function PaySuccess() {
  const [info, setInfo] = useRecoilState(reserveInfo);
  const customerSeq = localStorage.getItem('userSeq')
  const navigate = useNavigate();
  // const [consultingSeq, setConsultingSeq] = useState(null);
  const [requestFile, setRequestFile] = useRecoilState(imgFileState);

  const handleComplete = async () => {
    try{
      const response  = await postReserveInfo(info);
      console.log('정보보보',response);
      // setConsultingSeq(response)
      //예약 정보 이미지 보내기
      if (response) {
        console.log('response왔어?', response)
        const formData = new FormData();
        formData.append("img", requestFile);

        try{
          console.log('try 페이지에 들어온 seq', response)
          const response1  = await postReserveImg(response, formData);
          console.log('이미지미지', response1);
          navigate(`/customermypage/${customerSeq}`)
        }catch(error){
          console.error("Img Send Error:", error);
        }
      }
  }catch(error){
    console.error("Img Send Error:", error);
  }
  }


  const handleKakaoPayInfo = async (token) => {
    try {
      const result = await kakaoPayInfo(token);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 현재 URL에서 쿼리 파라미터를 가져오기 위해 URLSearchParams 객체 사용
    const params = new URLSearchParams(window.location.search);

    // 'token'이라는 파라미터 이름으로 값을 가져옴
    const token = params.get("pg_token");

    handleKakaoPayInfo(token);
  }, []);

  return (
    <Container>
        <Text>결제가 완료되었습니다.</Text>

        <button onClick={handleComplete}>예약 확정 하기</button>
    </Container>
  )
}

export default PaySuccess;
