// 고객의 최근 상담 내역 보여주는 컴포넌트

import { styled } from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`;
const Hr = styled.div`
  margin: 20px 0 20px 10px;
  border-bottom : 2px solid;
  border-color: ${(props) => props.color || "rgba(0, 0, 0, 0.1)"};
  width: ${(props)=> props.width || ""};
  align-items: center;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;

const DetailBox = styled.div`
  
`;
const DesignerImg = styled.img`
  width: 100px;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;
// const InfoBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin-left: 10px;
//   margin-top: -40px;
// `;

const Name = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin: 5px;
`;

const Icon = styled.img`
  width: 21px;
  margin-right: 3px;
  margin-left: 5px;
`;
const StarBox = styled(motion.div)`
  width: 70px;
  height: 35px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 10px;
`;
const Time = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
`;
const Day = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 5px;
`;
const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
`;
const CommentBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
margin-left: 20px;
`;

// const HashTag = styled.button`
//   border: 0;
//   border-radius: 0.3rem;
//   background-color: #AF9571;
//   color: #242321;
//   height: 30px;
//   margin-right: 10px;
//   padding: 2px 15px;
// `
const CunsultBox = styled.div`
  border: 0;
  border-radius: 0.6rem;
  background-color: #fff9e6;
  width: 100%;
  height: 450px;
  padding-top: 70px;
  padding-left: 30px;
`;
// const ResultBox = styled.div`
//   border: 0;
//   border-radius: 0.6rem;
//   background-color: #4F472F;
//   width: 70%;
//   height: 280px;
//   margin-left: 10px;
//   margin-top: 10px;
//   padding-top: 30px;
//   padding-left: 30px;
// `;

const Letter = styled.p`
  color : white;
`;
const ModalButton = styled.button`
  /* 버튼 스타일링 */
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  /* 모달 오버레이 스타일 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  /* 모달 스타일 */
  background-color: white;
  padding: 20px;
  z-index: 9999;
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
function ReserveList() {
  const {scrollY} = useScroll();
  const bigModalMatch = useMatch("customermypage/result/:designerSeq");
  console.log(bigModalMatch)
  const navigate = useNavigate();
  const onBoxClicked = (designerSeq) => {
    navigate(`result/${designerSeq}`);
  };
  const onOverlayClick = () => {
    navigate('/customermypage');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  };
  function closeModal() {
    setIsModalOpen(false);
  };
  const data = {
    "name" : "소희",
    "consultingDate" : "07/11",
    "designerSeq" : 1,
    "consultingStartTime" : "22:00",
    "hairStyle" : [
        "레이어드컷",
        "히피펌",
        "검정색"
    ],
    "reviewResult" : "전형적인 계란형얼굴로 레이어트컷이 어울려요!",
    "reviewImgs" : [
        "img1.png",
        "img2.png",
        "img3.png"
    ]
  }
  const pastConsuting = [
    {
        "consultingSeq" : 8,
        "designerImg" : "img1.png",
        "allReviewScore" : 4.7,
        "name" : "지윤",
        "consultingDate" : "05.21",
        "consultingDateDay" : "금",
        "consultingStartTime" : "18:30",
        "consultingEndTime" : "17:00",
        "myReviewScore" : 4.9,
        "reviewContent" : "옛날에 남긴 나의 한줄평",
    },];

    const result = [{
      "hairStyle" : [
        {
            "hairStyleSeq" : 1,
            "hairStyleLabel" : "레이어드컷"
        },
        {
            "hairStyleSeq" : 2,
            "hairStyleLabel" : "히피펌"
        },
        {
            "hairStyleSeq" : 3,
            "hairStyleLabel" : "중단발"
        }
    ],
    "imgs" : [
        {
            "imgSeq" : 1,
            "img" : "img1.png"
        },
        {
            "imgSeq" : 2,
            "img" : "img2.png"
        },
        {
            "imgSeq" : 3,
            "img" : "img3.png"
        },
    ]
}]

  return (
    <Container>
      <Hr/>
      <Wrap>
      <Wrapper>
        <Box>
          <ProfileBox>
          <DesignerImg src="./icon/designerimg.png"/>
            <StarBox>
              <Icon src="./icon/star.png"/>
              <Text>4.8</Text>
            </StarBox> 
          </ProfileBox>
        </Box>
        <InfoBox>
          <Name>재현 디자이너</Name>
          <Box>
            <Day>{pastConsuting[0].consultingDate} ({pastConsuting[0].consultingDateDay})</Day>
            <Time>{pastConsuting[0].consultingStartTime} ~ {pastConsuting[0].consultingEndTime}</Time>
            {/* <Day>7/14(금)</Day>
            {personA && <Time>{personA.consultingStartTime} ~ {getPlus30(personA.consultingStartTime)} </Time>} */}
          </Box>

          <Box>
            <StarBox>
              <Icon src="./icon/star.png"/>
              <Text>4.8</Text>
            </StarBox>
            <CommentBox>
              {/* <Icon src="./icon/money.png"/> */}
              <Text>{pastConsuting[0].reviewContent}</Text>
            </CommentBox>
          </Box>
        </InfoBox>
      </Wrapper>
        <DetailBox >
          <Text onClick={() =>onBoxClicked(data.designerSeq)}>상담 결과 보기</Text>
        </DetailBox>
      </Wrap>
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
                layoutId={data.designerSeq}>
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
    </Container>
  )
}
export default ReserveList;