import { styled } from "styled-components";
import Step from "../../components/SignUpComponent/Step";
import { motion } from "framer-motion";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;

`;
const StepWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  margin-left: 40px;
  margin-right: 40px;
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 450px;
  margin-top: 30px;
  border-radius: 20px;
  background-color: rgb(249,245,240);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 30px 0;
`;
const Text = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin: 15px;
`;

const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
const DesignerImg = styled.img`
  margin-left: 25px;
  width: 150px;
  height: 200px;
`;

const CustomerImg = styled.img`
  width: 150px;
  height: 200px;
`;

const Btn = styled(motion.button)`
  background-color: rgb(242,234,211);
  color: black;
  padding: 10px 55px;
  border: 0;
  border-radius: 15px;
  font-size: 22px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: rgb(244,153,26);
  }
`;


function UserTypeComponet() {
  return (
    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" />
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr/>
      <TypeWrapper>
        <Title>회원 유형 선택</Title>
        <Wrapper>
          <Box>
            <DesignerImg src="./icon/hair-cutting.png"/>
            <Text>디자이너</Text>
            <Btn>회원가입</Btn>
          </Box>
          <Box>
            <CustomerImg src="./icon/woman.png"/>
            <Text>일반 회원</Text>
            <Btn>회원가입</Btn>
          </Box>
        </Wrapper>
      </TypeWrapper>
    </Container>
  )
}
export default UserTypeComponet;