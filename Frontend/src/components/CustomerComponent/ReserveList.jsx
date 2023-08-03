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
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BigWrap = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`;
const Box = styled.div`
  display: flex;
  
`;

const DetailBox = styled.div`
  margin-top: 5px;
`;
const DesignerImg = styled.img`
  width: 100px;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
`;
const Name = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Icon = styled.img`
  width: 21px;
  margin-right: 3px;
`;
const StarBox = styled(motion.div)`
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
`;
const Time = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
const Day = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;

`;
const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
const CommentBox = styled.div`
display: flex;
justify-content: center;
align-items: center;

`;

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

  const result = {
    "customerSeq" : 1,
    "name" : "김싸피",
    "id" : "ssafy",
    "email" : "ssafy@gmail.com",
    "img" : "img1.png",
    "hairCondition" : [
        "얇은 모발",
        "굵은 모발"
    ],
    "face" : "계란형",
    "futureConsulting" : [
        {
            "consultingSeq" : 10,
            "designerImg" : "img1.png",
            "reviewScore" : 4.7,
            "name" : "지윤",
            "consultingDate" : "08.21",
            "consultingDateDay" : "금",
            "consultingStartTime" : "18:30",
            "url" : " ",
        },
        {
            "consultingSeq" : 11,
            "designerImg" : "img2.png",
            "reviewScore" : 4.8,
            "name" : "민지",
            "consultingDate" : "08.22",
            "consultingDateDay" : "금",
            "consultingStartTime" : "18:30",
            "url" : " ",
        }
    
    ],
    "pastConsulting" : [
        {
            "consultingSeq" : 8,
            "designerImg" : "icon/designerimg.png",
            "allReviewScore" : 4.7,
            "name" : "지윤",
            "consultingDate" : "05.21",
            "consultingDateDay" : "금",
            "consultingStartTime" : "18:30",
            "consultingEndTime" : "17:00",
            "myReviewScore" : 4.9,
            "reviewContent" : "최고에요!",
        },
        {
            "consultingSeq" : 9,
            "designerImg" : "icon/designerimg.png",
            "allReviewScore" : 4.7,
            "name" : "민지",
            "consultingDate" : "06.21",
            "consultingDateDay" : "금",
            "consultingStartTime" : "18:30",
            "consultingEndTime" : "17:00",
            "myReviewScore" : 4.9,
            "reviewContent" : "추천합니다!",
        },
      ]
    }

  return (
    <Container>
      {result.pastConsulting.map((data) => (
        <BigWrap>
          <Wrap>
            <Wrapper>
              <Box>
                <ProfileBox>
                  <DesignerImg src={data.designerImg}/>
                  <StarBox>
                    <Icon src="./icon/star.png"/>
                    <Text>{data.allReviewScore}</Text>
                  </StarBox> 
                </ProfileBox>
                <InfoBox>
                  <Name>{data.name} 디자이너</Name>
                  <Box>
                    <StarBox>
                      <Icon src="./icon/star.png"/>
                      <Text>{data.myReviewScore}</Text>
                    </StarBox>
                    <CommentBox>
                      <Text>{data.reviewContent}</Text>
                    </CommentBox>
                  </Box>
                  <DetailBox >
                    <Text onClick={() =>onBoxClicked(data.designerSeq)}>상담 결과 보기</Text>
                  </DetailBox>
                </InfoBox>
              </Box>
            </Wrapper>
            <Box>
              <Day>{data.consultingDate}({data.consultingDateDay})</Day>
              <Time>{data.consultingStartTime} ~ {data.consultingEndTime}</Time>
            </Box>
          </Wrap>
          <Hr/>
        </BigWrap>
      ))}
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