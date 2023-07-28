import { styled } from "styled-components";
import Step from "../../components/SignUpComponent/Step";
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
const Wrapper = styled.div`
  margin: 40px 40px 0 40px;
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;

`;
const BackBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.6);
  width: 700px;
  height: 500px;
  margin: 60px auto;
  border-radius: 15px;
`;
const FrontBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background-color: rgba(255,255,255,1);
  width: 90%;
  height: 87%;
  border-radius: 15px;
`;

const Img = styled.img`
  margin: 55px auto;
  width: 80px;
  height: 80px;
`;

const Text = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  background-color: rgba(244,153,26,1);
  color: black;
  padding: 10px 30px;
  margin: 20px 40px;
  border: 0;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;
  &:hover {
  color: #f7f5e1;
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

function Complete() {
  const name = "지윤"
  const navigete = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" />
        <Step top="step4" bottom="가입 완료" />
      </Wrapper>
      <Hr/>
      <BackBox>
        <FrontBox>
          <Img src="/icon/complete.png" />
          <Text>{name}님의 회원 가입이 완료되었습니다.</Text>
          <Text>다양한 콘텐츠를 이용해보세요!</Text>
          <BtnBox>
            <Btn onClick={() => navigete('/')}>홈 화면으로</Btn>
            <Btn onClick={() => navigete('/')}>추가 정보 등록</Btn>
          </BtnBox>
        </FrontBox>
      </BackBox>
    </Container>
  )
}
export default Complete;