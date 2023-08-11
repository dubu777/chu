import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { kakaoPayInfo } from "../../apis/kakao";

const Container = styled.div`
  margin: 50px;
`;

function PaySuccess() {
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
      <p> 카카오페이 결제 성공 페이지</p>
      <hr />
    </Container>
  );
}

export default PaySuccess;
