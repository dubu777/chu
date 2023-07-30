// 여기는 디자이너 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import CustomerPageInfo from "../../components/CustomerComponent/CustomerPageInfo";
import ScheduleListImg from "../../components/CustomerComponent/ScheduleListImg";
import ReserveList from "../../components/CustomerComponent/ReserveList";
import LikeDesigner from "../../components/CustomerComponent/LikeDesigner";
import axios from 'axios';

const Container = styled.div`

`;
const ReserveWrapper = styled.div`
  border: solid 2px;
  border-color: gray;
  margin: 200px auto 50px auto;
  height: 150px;
  width: 60%;
  border-radius: 0.7rem;
`;

const Wrapper = styled.div`
  width: 60%; 
  /* hesight: 500px; */
  margin: 30px auto 10px auto;
  
`;

const ImgBox = styled.div`
  
`;
const TextBox = styled.div`
  
`;
const InfoBox = styled.div`
`;

const Box = styled.div`
  height: 500px;
  border: 0;
  background-color: #F9F5F0;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 15px;
  /* border-color: #83807a; */
  background-color: ${(props) => props.bgcolor || "#f8f3ed"};
  border-bottom: white;
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`

function DesignerMyPage(){
  const [showCalendar, setShowCalendar] = useState(true); // 상담 캘린더
  const [showReserveList, setShowReserveList] = useState(false); // 예약 목록
  const [showPortfolio, setShowPortfolio] = useState(false); // 포트폴리오

  function handleShowCalendar() {
    setShowCalendar(true);
    setShowReserveList(false);
    setShowPortfolio(false);
  }

  function handelShowReserveList() {
    setShowCalendar(false);
    setShowReserveList(true);
    setShowPortfolio(false);
  }

  function handleShowAnotherComponent() {
    setShowCalendar(false);
    setShowReserveList(false);
    setShowPortfolio(true);
  }


  return(
    <Container>
      {/*  */}
        <CustomerPageInfo />

      {/* 예약 정보 확인하기 */}
        <ReserveWrapper>
          <ImgBox>
            <ScheduleListImg />
          </ImgBox>
          <TextBox>

          </TextBox>
          <InfoBox>

          </InfoBox>
        </ReserveWrapper>

{/* 여기는 탭 작동 */}
        <Wrapper>
          <ClickBtn 
            onClick={handleShowCalendar} 
            bgcolor={showCalendar ? "#F9F5F0" : "#f5ebb8"}
            border = {showCalendar ? " ":"#898773 #898773 none #898773" }
            >상담 캘린더
          </ClickBtn>
          <ClickBtn 
            onClick={handelShowReserveList} 
            bgcolor={showCalendar ? "#f5ebb8" : "#F9F5F0"}
            >예약 관리
          </ClickBtn>
          <ClickBtn 
            onClick={handelShowReserveList} 
            bgcolor={showCalendar ? "#f5ebb8" : "#F9F5F0"}
            >포트폴리오
          </ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {showCalendar && <ReserveList />}
            {showReserveList && <LikeDesigner />}
          </Box>





        </Wrapper>



    </Container>
    )
}


export default DesignerMyPage;