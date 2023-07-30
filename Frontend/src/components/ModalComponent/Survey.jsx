import { styled } from "styled-components";
import Step from "../SignUpComponent/Step";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
// import hearto from "../../icon/hearto.png";
// import heartx from "../../icon/heartx.png";
// import designer from "../../icon/hair-cutting.png";
// import woman from "../../icon/woman.png";
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
  height: 71vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
`;

const ModalText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const LikeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.handleLike ? "rgb(242,234,211)" : "white")};
  padding: 7px 15px;
  border: 2px solid rgb(247, 181, 88);
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const ModalHr = styled.div`
  margin-top: 10px;
  border-bottom : 2px solid rgb(214, 212, 212);
`;
const LikeBtnText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
    cursor: pointer;
  }
`;
const ReviewInput = styled.input`
  background-color: rgb(249, 245, 240);
  border: 0;
  border-radius: 10px;
  padding: 10px 250px 90px 5px;
  /* width: 80%;
  height: 100px; */
  margin-top: 10px;
`;
const LikeBtn = styled.img`
  width: 27px;
  height: 27px;
  cursor: pointer;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 5px;
  align-items: center;
`;
const SubmitBtn = styled.button`
  width: 50px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  border: 0;
  border-radius: 5px;
  background-color: rgb(247, 181, 88);
`;
const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 50px;
  margin-top:10px;
`;
function Review() {
  const navigate = useNavigate();
  const [data, setData] = useState()
  const {scrollY} = useScroll();
  const bigModalMatch = useMatch("/modaltest/1");
  console.log(bigModalMatch)
  const onBoxClicked = () => {
    navigate(`/modaltest/1`);
  };
  const onOverlayClick = () => {
    navigate('/modaltest');
  };
  const MAX_RATE = 5; // 최대 점수
  const [currentRate, setCurrentRate] = useState(0);
  // 별 클릭 시 해당 별 이하의 점수를 반환하는 함수
  const handleStarClick = (rate) => {
    setCurrentRate(rate);
  };
  const [handleLike, setHandleLike] = useState(false); // 좋아요 상태를 state로 관리
  const toggleLike = () => {
    setHandleLike(prev => !prev); // 좋아요 상태를 토글
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
            <DesignerImg src="./icon/hair-cutting.png"/>
            <Text>디자이너</Text>
            <SubText>디자이너가 홈페이지에 가입하는 경우</SubText>
            <Btn onClick={() => navigate('/designersignup')}>회원가입</Btn>
          </Box>
          <Box
            variants={boxVariants} 
            initial="nomal" 
            whileHover="hover">
            <CustomerImg src="./icon/woman.png"/>
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
                <ModalBox>
                  <ModalText>상담이 마음에 든다면,</ModalText>
                  <LikeBtnBox onClick={toggleLike} handleLike={handleLike}>
                    <LikeBox>
                      {handleLike ? (
                        // 좋아요가 눌려있을 때 빨간색 하트 아이콘
                        <LikeBtn src="./icon/hearto.png"/>
                      ) : (
                        // 좋아요가 눌려있지 않을 때 빈 하트 아이콘
                        <LikeBtn src="./icon/heartx.png"/>
                      )}
                    </LikeBox>
                    <LikeBtnText>이 디자이너 좋아요!</LikeBtnText>
                  </LikeBtnBox>
                  <ModalHr/>
                </ModalBox>
                <ModalHr/>
                <ModalBox>
                  <ModalText>상담은 만족하셨나요?</ModalText>
                  <StarRateWrap>
                    {Array.from({ length: MAX_RATE }, (_, idx) => idx + 1).map((rate) => (
                      <span
                        className="star_icon"
                        key={`star_${rate}`}
                        onClick={() => handleStarClick(rate)}
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="39"
                          viewBox="0 0 24 24"
                          fill={rate <= currentRate ? "rgb(246, 215, 15)" : "#cacaca"}
                        >
                          <path
                            d="M12 1l2.4 7.2h7.7l-5.7 4.2 2.4 7.2-6-4.5-6 4.5 2.4-7.2-5.7-4.2h7.7z"
                          />
                        </motion.svg>
                      </span>
                    ))}
                  </StarRateWrap>
                </ModalBox>
                <ModalHr/>
                <ModalBox>
                  <ModalText>한 줄 후기를 남겨주세요:)</ModalText>
                  <ReviewInput placeholder="리뷰 작성하기" />
                </ModalBox>
                <SubmitBox>
                  <SubmitBtn onClick={onOverlayClick}>작성</SubmitBtn>
                </SubmitBox>
              </BigModal>          
          </>
          ) : null 
        }
      </AnimatePresence>
    </BigWrapper>
  )
}
export default Review;