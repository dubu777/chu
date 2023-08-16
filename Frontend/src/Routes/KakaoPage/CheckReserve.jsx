import { styled } from "styled-components";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { kakaoPayReady } from "../../apis/kakao";
import { motion } from "framer-motion";
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { useRecoilState } from 'recoil';
import {reserveInfo, imgFileState} from "../../recoil"
import { useNavigate } from "react-router";

const BigContainer = styled.div`
  display: flex;
  background-color: rgba(118, 118, 118, 0.07);
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;

`;
const Reservwrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 80%;
  padding: 50px;
  border-radius: 13px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const TitleBox = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
  justify-content: flex-start;
  
`;
const Hr = styled.div`
  border: 1px solid rgb(228, 223, 223);
  width: 100%;
  margin: 20px 0;
`;

const Box = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 50px;
`;

const BigKaKaoImg = styled.img`
  width: 320px;
  margin-right: 30px;
  padding: 30px 10px 20px 30px;
`;
const BigkakaoBox = styled.div`
  background-color: #F7E600;
  border-radius: 30px;
  
`;
const ReservText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;
const CheckBox = styled.input`
  margin-bottom: 5px;
`;
const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckBoxWrap = styled.div`
  margin-bottom: 10px;
`;
const CheckBoxLabel = styled.label`
`;
const grayText = styled.input`
  font-size: 16px;
  font-weight: 600;
  color: #a4a2a2;
`;
const PayBtn = styled.button`
  width: 150px;
  height: 45px;
  background-color: #ffd323;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-weight: 600;
`;
const PayBtnWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  margin-bottom: 20px;
`;
const ReservBtnVariant = {
  nomal: {
    backgroundColor: "white",
    color: "black",
  },
  hover: {
    backgroundColor: "rgb(244,153,26)",
    color: "white",
  },
};
function CheckReserve() {
  const handleKakaoPayReady = async () => {
    //console.log("handle kakaopay ready");
    try {
      const result = await kakaoPayReady();
      //console.log(result.result);
      window.location.href = result.result;
    } catch (error) {
      console.log(error);
    }
  };
  const [agreeFirst, setAgreeFirst] = useState(false);
  const [agreeSecond, setAgreeSecond] = useState(false);
  const [info, setInfo] = useRecoilState(reserveInfo);
  const [requestFile, setRequestFile] = useRecoilState(imgFileState);
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!agreeFirst || !agreeSecond) {
      swal("약관 동의 필요", "모든 약관에 동의해야 합니다.", "warning");
      return;
    } else {
      handleKakaoPayReady();
    }
  };
  const handleBack = () => {
    navigate(-1)
  }
  console.log(requestFile, "결제 준비 이미지 데이터");
  console.log(info, "결제 준비 예약 정보 인포");
  return (
    <BigContainer>
    <Container>
      <Reservwrap>
        <TitleBox>
          <Title>결제 수단 선택</Title>
        </TitleBox>
        <Hr/>
        <Box>
          <BigkakaoBox>
            <BigKaKaoImg src="/icon/kakaopay.png" /> 
          </BigkakaoBox>
          <ReservText>카카오페이</ReservText>
        </Box>
        <CheckWrapper>
        <CheckBoxWrap>
        <CheckBox
          type="checkbox"
          id="agreeFirst"
          checked={agreeFirst}
          onChange={(e) => setAgreeFirst(e.target.checked)}
        />
        <CheckBoxLabel htmlFor="agreeFirst">상품 주문 및 배송정보 수집에 동의합니다. (필수)</CheckBoxLabel>
        </CheckBoxWrap>
        <CheckBoxWrap>
        <CheckBox
          type="checkbox"
          id="agreeSecond"
          checked={agreeSecond}
          onChange={(e) => setAgreeSecond(e.target.checked)}
        />
        <CheckBoxLabel htmlFor="agreeSecond">주문 상품의 명시 내용과 사용조건을 확인하였으며 취소환불 규정에 동의합니다. (필수)</CheckBoxLabel>
        </CheckBoxWrap>
        </CheckWrapper>
        <Hr/>
        <PayBtnWrap>
          <PayBtn onClick={handleBack}>뒤로가기</PayBtn>
          <PayBtn onClick={handlePayment}>결제하기</PayBtn>
        </PayBtnWrap>
      </Reservwrap>
    </Container>
    </BigContainer>
  );
}

export default CheckReserve;
