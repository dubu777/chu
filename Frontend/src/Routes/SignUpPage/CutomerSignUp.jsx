import { styled } from "styled-components";
import Step from "../../components/SignUpComponent/Step";
import CustomerUserInfo from "../../components/SignUpComponent/CutomerUserInfo";

const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  margin-left: 40px;
  margin-right: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;

`;



function CustomerSignUp() {
  return (
    <Container>
      <Wrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" bgcolor="rgb(244,153,26)"/>
        <Step top="step4" bottom="가입 완료" />
      </Wrapper>
      <Hr/>
      <CustomerUserInfo/>
    </Container>
  )
}
export default CustomerSignUp;