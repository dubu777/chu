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
  margin: 160px auto 50px auto;
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
  border-top-right-radius: 15px;
  background-color: #F9F5F0;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 15px;
  border-bottom-color: white;
  border: 2px solid white;
  background-color: ${({ isActive }) => (isActive ? '#F9F5F0' : '#F2EAD3')};
  border-left-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-top-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-right-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`

function CustomerMyPage(){
  const [activeBtn, setActiveBtn] = useState('recent'); // 'recent' or 'designer'

  const handleBtnClick = (btnType) => {
    setActiveBtn(btnType);
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
          <ClickBtn 
            isActive={activeBtn === 'recent'} 
            onClick={() => handleBtnClick('recent')}
            >최근 상담 내역
          </ClickBtn>
          <ClickBtn 
            isActive={activeBtn === 'designer'} 
            onClick={() => handleBtnClick('designer')}
            >좋아요 한 디자이너
          </ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {activeBtn === 'recent' && <ReserveList />}
            {activeBtn === 'designer' && <LikeDesigner />}
          </Box>
        </Wrapper>
    </Container>
    )
}


export default CustomerMyPage;