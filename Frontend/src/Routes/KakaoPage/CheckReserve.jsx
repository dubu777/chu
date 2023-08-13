import { styled } from "styled-components";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { kakaoPayReady } from "../../apis/kakao";
import { motion } from "framer-motion";
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Reservwrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
`;
const LogoBox = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;
const TitleBox = styled.div`
  display: flex;
  margin-top: 40px;
`;
const Title = styled.span`
  font-size: 20px;
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
  align-items: center;
  margin-bottom: 30px;
`;
const KaKaoImg = styled.img`
  width: 80px;
  margin-right: 30px;
  
`;
const BigKaKaoImg = styled.img`
  width: 300px;
  margin-right: 30px;
  padding: 30px 10px 20px 30px;
`;
const BigkakaoBox = styled.div`
  background-color: #F7E600;
  border-radius: 30px;
  
`;
const ReservText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;
const CheckBox = styled.input`
  margin-bottom: 5px;
`;
const CheckBoxWrap = styled.div`
`;
const CheckBoxLabel = styled.label`
`;
const PayBtn = styled.button`
  width: 80px;
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
  const handlePayment = () => {
    if (!agreeFirst || !agreeSecond) {
      swal("약관 동의 필요", "모든 약관에 동의해야 합니다.", "warning");
      return;
    } else {
      handleKakaoPayReady();
    }
  };
  return (
    <Container>
      <Reservwrap>
        <LogoBox>
          <KaKaoImg src="/icon/kakaopay.png"/>
        </LogoBox>
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
        <PayBtn onClick={handlePayment}>결제하기</PayBtn>
        {/* <ReservText>상품 주문 및 배송정보 수집에 동의합니다. (필수)</ReservText>
        <ReservText>주문 상품의 명시 내용과 사용조건을 확인하였으며 취소환불 규정에 동의합니다. (필수)</ReservText> */}
        {/* <ReservText></ReservText> */}
      </Reservwrap>
    </Container>
  );
}

export default CheckReserve;
