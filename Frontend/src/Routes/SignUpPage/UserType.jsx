import { styled } from "styled-components";
import Step from "../../components/SignUpComponent/Step";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


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
  margin-bottom: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Box = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 370px;
  height: 400px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: rgb(249,245,240);
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06); */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

const Title = styled.span`
  font-size: 30px;
  font-family: "Sandol-B";   
  font-weight: bolder;
  margin: 40px 0 30px 0;
  /* font-family: "Apple-H";     */
`;
const Text = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
  font-family: "Apple-H";    
`;
const SubText = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0 40px 0;
  color: rgb(100,93,81);
`;
const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
const DesignerImg = styled.img`
  margin-left: 50px;
  width: 120px;
  height: 170px;
`;

const CustomerImg = styled.img`
  width: 120px;
  height: 170px;
`;

const Btn = styled(motion.button)`
  background-color: rgb(242,234,211);
  color: black;
  padding: 10px 55px;
  border: 0;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: rgb(244,153,26);
  color: #f7f5e1;
  }
`;

const boxVariants = {
  nomal: {
    scale: 1
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  }
}

function UserTypeComponet() {
  const navigate = useNavigate();

  return (

    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" bgcolor="rgb(244,153,26)"/>
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" />
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr/>
      <TypeWrapper>
        <Title>회원 유형 선fgsdfbsv</Title>
        <Wrapper>
          <Box
            onClick={() => navigate('/designersignup')}
            variants={boxVariants} 
            initial="nomal" 
            whileHover="hover">
            <DesignerImg src="./icon/hair-cutting.png"/>
            <Text>디자이너</Text>
            <SubText>디자이너가 홈페이지에 가입하는 경우</SubText>
            <Btn onClick={() => navigate('/designersignup')}>회원가입</Btn>
          </Box>
          <Box
            onClick={() => navigate('/customersignup')}
            variants={boxVariants} 
            initial="nomal" 
            whileHover="hover">
            <CustomerImg src="./icon/woman.png"/>
            <Text>일반 회원</Text>
            <SubText>일반 회원이 홈페이지에 가입하는 경우</SubText>
            <Btn onClick={() => navigate('/customersignup')}>회원가입</Btn>
          </Box>
        </Wrapper>
      </TypeWrapper>
    </Container>
    
  )
}
export default UserTypeComponet;