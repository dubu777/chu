// 고객의 최근 상담 내역 보여주는 컴포넌트

import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-top: -40px;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
`;
const Name = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin: 5px;
`;
const Intro = styled.span`
  font-size: 13px;
  font-weight: 500;
  margin-top: 3px;
`;
const Reviewer = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: grey;
  margin-top: 3px;
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

const HashTag = styled.button`
  border: 0;
  border-radius: 0.3rem;
  background-color: #AF9571;
  color: #242321;
  height: 30px;
  margin-right: 10px;
  padding: 2px 15px;
`
const CunsultBox = styled.div`
  border: 0;
  border-radius: 0.6rem;
  background-color: #fff9e6;
  width: 100%;
  height: 450px;
  padding-top: 70px;
  padding-left: 30px;
`;
const ResultBox = styled.div`
  border: 0;
  border-radius: 0.6rem;
  background-color: #4F472F;
  width: 70%;
  height: 280px;
  margin-left: 10px;
  margin-top: 10px;
  padding-top: 30px;
  padding-left: 30px;
`;

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

function ReserveList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  };
  function closeModal() {
    setIsModalOpen(false);
  };
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

  // // 백엔드에서 가져오게 될 형태 임시
  // const timeDataFromBackend = [
  //   { consultingSeq: 'a', consultingStartTime: '10:30' },
  //   { consultingSeq: 'b', consultingStartTime: '11:00' },
  //   { consultingSeq: 'c', consultingStartTime: '12:00' },
  // ];

  // // a만 가져올거야..일단
  // const personA = timeDataFromBackend.find(person => person.consultingSeq === 'a');

  // const getPlus30 = (consultingStartTime) => {
  //   const [hour, minute] = consultingStartTime.split(':').map(Number);
  //   const addedMinute = (minute + 30) % 60;
  //   const addedHour = hour + Math.floor((minute + 30) / 60);

  //   // 30분 더해서 24시를 넘어가면 처리
  //   const formattedHour = addedHour % 24;

  //   return `${formattedHour.toString().padStart(2, '0')}:${addedMinute.toString().padStart(2, '0')}`;
  // };

  // useEffect(() => {
  //   // 백엔드에서 시간 정보를 가져오는 API 요청
  //   axios.get('/api/time') // 나중에 실제 API 주소로 변경해야 함
  //     .then(response => {
  //       // API 요청 성공하면 시간 데이터 상태 변수에 저장
  //       setTimeData(response.data);
  //     })
  //     .catch(error => {
  //       // 에러 처리 로직
  //       console.error('예약 시간 정보 가져오기 실패.', error);
  //     });
  // }, []);
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
          <Text onClick={openModal}>상담 결과 보기</Text>
        </DetailBox>
      </Wrap>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <ModalWrapper>
        <ModalContent>
        <CunsultBox>
            <InfoBox>
              <Name>상담사명 : {pastConsuting[0].name}디자이너 </Name>
                <Box>  
                  <Name>상담일시 : {pastConsuting[0].consultingDate} ({pastConsuting[0].consultingDateDay})</Name>
                  <Name>{pastConsuting[0].consultingStartTime} ~ {pastConsuting[0].consultingEndTime}</Name>
                </Box>
                <Box>
                  <Name>스타일 진단 : </Name>  {result[0].hairStyle.map((style, index) => (
                  <HashTag key={index}>  #{style.hairStyleLabel} </HashTag>
                  ))}
                </Box>
            </InfoBox>
            <ResultBox>
              <Letter>상담 결과</Letter>
              <Hr color="ivory" width="90%"></Hr>
            </ResultBox>
          </CunsultBox>
          <button onClick={closeModal}>닫기</button>
          </ModalContent>
        </ModalWrapper>
      </Modal>
    </Container>
  )
}
export default ReserveList;