// 여기는 고객 마이페이지
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
  border: ${(props) => props.border || "hidden"};
  background-color: ${(props) => props.bgcolor || "#F9F5F0"};
  border-radius: 1rem 1rem 0rem 0rem;
`

function CustomerMyPage(){
  const [showReserveList, setShowReserveList] = useState(true); // 상담 내역 컴포넌트
  const [showLikeDesigner, setShowLikeDesigner] = useState(false); // 디자이너 컴포넌트

  function handleShowReserveList() {
    setShowReserveList(true);
    setShowLikeDesigner(false);
  };

  function handleShowLikeDesigner() {
    setShowReserveList(false);
    setShowLikeDesigner(true);
  };

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
          <ClickBtn onClick={handleShowReserveList} bgcolor="#F2EAD3">최근 상담 내역</ClickBtn>
          <ClickBtn onClick={handleShowLikeDesigner} bgcolor="#F2EAD3">좋아요 한 디자이너</ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {showReserveList && <ReserveList />}
            {showLikeDesigner && <LikeDesigner />}
          </Box>





        </Wrapper>



    </Container>
    )
}


export default CustomerMyPage;