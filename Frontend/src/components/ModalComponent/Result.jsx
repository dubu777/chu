import { styled } from "styled-components";
import Step from "../SignUpComponent/Step";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";

const BigWrapper =styled.div`
`;
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
  font-weight: bold;
  margin: 40px 0 30px 0;
`;
const Text = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  /* opacity: 0; */
`;
const BigModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 45vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: rgb(242,234,211);
`;
const InfoText = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const BigModalBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;
const HashTag = styled(motion.span)`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: rgba(175,149,113, 0.75);
  color: black;
  border-radius: 5px;
  cursor: pointer;
`;
const ResultWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ResultBox = styled.span`
  background-color: rgb(79, 71, 47);
  padding: 20px;
  border-radius: 10px;
  width: 70%;
  color: white;
  font-size: 14px;
  line-height: 1.5;
`;
const ResultHr = styled.hr`
  color: white;
`;
const ReviewImg = styled.img`
  width: 23%;
`;
function Result() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    "name" : "소희",
    "consultingDate" : "07/11",
    "consultingStartTime" : "22:00",
    "hairStyle" : [
        "레이어드컷",
        "히피펌",
        "검정색"
    ],
    "reviewResult" : "전형적인 계란형 얼굴형 이며, 펄스널 컬러를 고려했을 때 밝은 갈색의 짧은 머리가 잘 어울릴 것으로 판단.하지만, 잦은 탈색으로 인해 염색이 어렵기 때문에 허쉬컷으로 포인트 주면 어울릴 것 같습니다. ",
    "reviewImgs" : [
        "img1.png",
        "img2.png",
        "img3.png"
    ]
})
  const {scrollY} = useScroll();
  const bigModalMatch = useMatch("/result/1");
  console.log(bigModalMatch)
  const onBoxClicked = () => {
    navigate(`/result/1`);
  };
  const onOverlayClick = () => {
    navigate('/result');
  };

  return (
    <BigWrapper>
    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" bgcolor="rgb(244,153,26)"/>
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" />
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr/>
      <TypeWrapper>
        <Title>회원 유형 선택</Title>
        <Wrapper>
          <Box
            onClick={() => navigate('/designersignup')}
            variants={boxVariants} 
            initial="nomal" 
            whileHover="hover">
            <DesignerImg src="icon/hair-cutting.png"/>
            <Text>디자이너</Text>
            <SubText>디자이너가 홈페이지에 가입하는 경우</SubText>
            <Btn onClick={() => navigate('/designersignup')}>회원가입</Btn>
          </Box>
          <Box
            variants={boxVariants} 
            initial="nomal" 
            whileHover="hover">
            <CustomerImg src="icon/woman.png"/>
            <Text>일반 회원</Text>
            <SubText>일반 회원이 홈페이지에 가입하는 경우</SubText>
            <Btn
              layoutId={'1'}
              onClick={() => onBoxClicked('1')}>회원가입</Btn>
          </Box>
        </Wrapper>
      </TypeWrapper>
    </Container>
    <AnimatePresence>
        { bigModalMatch ? (
          <>
            <Overlay 
              onClick={onOverlayClick}
              initial= {{opacity: 0}}
              animate={{ opacity: 1 }}
              exit={{opacity: 0}}
              />
              <BigModal 
                style={{ top: scrollY.get() + 110 }}
                layoutId="1">
                <BigModalBox>
                  <InfoBox>
                    <InfoText>상담사명 : {data.name} 디자이너</InfoText>
                    <InfoText>상담일시 : {data.consultingDate} {data.consultingStartTime}</InfoText>
                    <InfoText>스타일 진단 : {data.hairStyle.map((tag) => (
                      <HashTag
                      key={tag}
                      >
                      #{tag}
                    </HashTag>
                    ))}</InfoText>
                    <ResultWrap>
                      <ResultBox>
                        상담 결과 <br/><ResultHr/> {data.reviewResult}
                      </ResultBox>
                      <ReviewImg src="/icon/designerimg.png" />
                    </ResultWrap>
                    {/* selectedCut.map((tag) => (
                      <HashTag
                        key={tag}
                        onClick={() => toggleCutType(tag)}
                        selected={selectedCut.includes(tag)}
                      >
                        #{tag}
                      </HashTag>
                    )) */}
                  </InfoBox>
                </BigModalBox>
              </BigModal>          
          </>
          ) : null 
        }
      </AnimatePresence>
    </BigWrapper>
  )
}
export default Result;