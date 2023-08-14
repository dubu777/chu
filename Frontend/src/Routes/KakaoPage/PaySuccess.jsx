import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { kakaoPayInfo } from "../../apis/kakao";
import { useNavigate } from "react-router";

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
      <Text>결제가 완료되었습니다.</Text>
      <button onClick={handleComplete}>예약 확정 하기</button>
    </Container>
  );
}

export default PaySuccess;
