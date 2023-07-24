// 여기는 고객 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import CustomerPageInfo from "../../components/CustomerComponent/CustomerPageInfo";
import ScheduleListImg from "../../components/CustomerComponent/ScheduleListImg";
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
  border: solid 2px gray;
  
`;



function CustomerMyPage(){
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
          <button>최근 상담 내역</button>
          <button>좋아요 한 디자이너</button>
          <Box>
            <ReserveList />
            <LikeDesigner />

          </Box>





        </Wrapper>



    </Container>
    )
}


export default CustomerMyPage;