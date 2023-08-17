import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { kakaoPayInfo } from "../../apis/kakao";
import { useNavigate } from "react-router";
import { motion, useAnimation } from "framer-motion";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  height: 700px;
  margin: 65px auto; 
  background-color: rgba(146, 132, 104, 0.07);
  padding: 30px;
`;
const EventText = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const EventTitle = styled.p`
  font-size: 50px;
  margin-bottom: 25px;
  font-family: "Abril Fatface";
`;
const EventIntroTag = styled.p`
  font-size: 15px;
  margin-top: 10px;
  /* margin-bottom: 5px; */
`;

const EventBox = styled(motion.div)`
  display: flex;
  width: 200px;
  height: 50px;
  border-radius: 0.1rem;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 22px;
  cursor: pointer;
  background: linear-gradient(90deg, #df9305 50%, #605b52 50%);
  /* background: linear-gradient(90deg, #bda67f 50%, #605b52 50%); */
  background-size: 200% 100%;
  background-position: right;
  transition: background 0.5s;

  &:hover {
    background-position: left;
  }
`;
const EventIntro = styled(motion.p)`
  font-size: 22px;
  margin-bottom: 25px;
  font-family: "Pretendard-Regular";
  text-align: center;
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  /* box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); */
`;
const Img  = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
`;
const SuccessBox = styled.div`
  display: flex;
`;

const Text = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const CompleteBtn = styled.button`
  background-color: white;
  border-radius: 5px;
  border: 1px solid blue;
`;
function PaySuccess() {
  const navigate = useNavigate();
  const customerSeq = localStorage.getItem('userSeq')
  const handleComplete = () => {
    try {
      navigate(`/customermypage/${customerSeq}`);
    } catch (error) {}
  };

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
      <MainWrapper>
        <EventText>
          <EventTitle>Complete <br/> Reservation</EventTitle>
          <Img src="/icon/complete.png"/>
          <EventIntro>결제완료</EventIntro>
          <EventIntroTag>상담 예약이 확정되었습니다.</EventIntroTag>
          <EventBox onClick={handleComplete}>예약 확인 하기</EventBox>
        </EventText>
      
      </MainWrapper>
    </Container>
  );
}

export default PaySuccess;
