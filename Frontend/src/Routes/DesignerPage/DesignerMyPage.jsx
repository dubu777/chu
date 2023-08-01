// 여기는 디자이너 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import ProfileImg from "../../components/CustomerComponent/ProfileImg";
import axios from 'axios';
import ReserveCalendar from "../../components/DesignerComponent/ReserveCalendar";
import AllReserveList from "../../components/DesignerComponent/AllReserveList";
import Portfolio from "../../components/DesignerComponent/Portfolio";
import { useNavigate } from "react-router";

const Container = styled.div`

`;

// 고정 프로필바
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-around;
	width: 100%;
	height: 300px;
	background-color: #f8f1d9;
  /* font-family: "Blue-road"; */
  /* font-family: "Apple-B";   */
    
`;
const ImgBox = styled.div`
  text-align: center;
  margin-top: 130px;
`;

const NameText = styled.h1`
  font-size: 25px;
  /* font-weight: bold; */
`;
const Text = styled.p`
  margin-bottom: 20px;
  font-size: large;
`;
const HashTag = styled.button`
  border: 0;
  border-radius: 0.3rem;
  background-color: #78756c;
  color: white;
  height: 30px;
  margin-right: 10px;
  padding: 2px 15px;
`
const InfoBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 185px;
  margin-left: -120px;
`;
const ChangeBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 240px;
  text-align: right;
`;

const ChangeBtn = styled.button`
  border: 0;
  border-radius: 0.4rem;
  background-color: #f9bd4f;
  width: 150px;
  height: 35px;
  
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
  margin: 170px auto 10px auto;
  
`;

const TextBox = styled.div`
  
`;

const Box = styled.div`
  min-height: 500px;
  height: 75%;
  border: 0;
  background-color: #F9F5F0;
  padding-bottom: 20px;
  margin-bottom: 60px;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 25px;
  margin-right: -1px;
  /* border-color: #83807a; */
  background-color: ${(props) => props.bgcolor || "#f8f3ed"};
  border-bottom: white;
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`

function DesignerMyPage(){
  const navigate = useNavigate();
  const [data, setData] = useState({
    "name" : "재현",
        "cost" : "5000",
        "email" : "ssafy@ssafy.com",
        "introduction" : " 남자 펌 전문 !",
        "img" : "img1.png",
        "hairStyleTag" : [
            "시스루펌",
            "아이롱펌",
            "레이어드"
        ],
        // 본인이 오늘 상담 가능하다고 선택했던 시간들
        "selectTime" : [
            "10:00",
            "10:30",
            "14:00"
        ]
  });
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

  function handleShowPortfolio() {
    setShowCalendar(false);
    setShowReserveList(false);
    setShowPortfolio(true);
  }


  return(
    <Container>
     <ProfileWrapper>
        <ImgBox>
          <NameText>{data.name}디자이너</NameText>
            <ProfileImg />
        </ImgBox>
        
        <InfoBox>
          <Text>{data.cost}</Text>
          <Text>{data.email}</Text>
          <Text>{data.introduction}</Text>
          {data.hairStyleTag.map((word, index) => (
            <HashTag key={index}> #{word} </HashTag>
          ))}
        </InfoBox>

        <ChangeBox>
          <ChangeBtn onClick={() => navigate("/editdesignerinfo")}>회원 정보 변경</ChangeBtn>
        </ChangeBox>
      </ProfileWrapper>
        


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
            bgcolor={showReserveList ? "#F9F5F0" : "#f5ebb8"}
            border = {showReserveList ? " ":"#898773 #898773 none #898773" }
            >예약 관리
          </ClickBtn>
          <ClickBtn 
            onClick={handleShowPortfolio} 
            bgcolor={showPortfolio ? "#F9F5F0" : "#f5ebb8"}
            border = {showPortfolio ? " ":"#898773 #898773 none #898773" }
            >포트폴리오
          </ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {showCalendar && <ReserveCalendar />}
            {showReserveList && <AllReserveList />}
            {showPortfolio && <Portfolio />}
          </Box>
        </Wrapper>
    </Container>
    )
}


export default DesignerMyPage;