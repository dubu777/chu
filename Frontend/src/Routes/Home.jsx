import { styled } from "styled-components";
import css from "../font/font.css";
import MainView from "../components/HomeComponent/MainView";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useQuery } from "react-query";
import { BASE_URL } from '../apis/rootUrl';
import { fetchMain, customerMain, designerMain } from "../apis";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  background-image: url('/img/password.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* width: 100vw; */
  height: 100vh;
`;
const MainWrapper = styled.div`
  margin-top: 40px;
  margin-left: 170px;
  margin-right: 170px;
`;
const ImgText = styled.p`
  font-family: sans-serif;
  top: 400px;
  left: 100px;
  font-size: 40px;
  font-weight: 700;
  color: #353432;
  position: absolute;
`;

const DesignerBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProfileBox = styled(motion.div)`
  background-color: #ffffff;
  border: 2px solid orange;
  width: 160px;
  height: 190px;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  text-align: center;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 10px -4px rgb(0 0 0 / 0.2);
  object-fit: cover;
  &:hover {
    transform: scale(1.02);
  }
`;
const pofolVariants = {
	nomal: {
		scale: 1,
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2
		},
	},
}
const Title = styled.h1`
  font-family: sans-serif;
  /* font-family: "omyu_pretty"; */
  font-size: 25px;
  /* font-family: "Blue-road"; */
  font-weight: bold;
`;
const ImgBox = styled.div`
  width: 80%;
  height: 80%;
  background-color: #fdf8e9;
  border-radius: 0.4rem;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 10px -4px rgb(0 0 0 / 0.2);
`;
const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  /* margin-top: 35%; */
  background-color: white;
  border-radius: 50%;
`;
const Name = styled.p`
  /* margin-top: 45%; */
  border: 0;
  background-color: #68655b;
  padding: 5px 15px;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 0.4rem;
  font-size: 13px;
  color: white;
`;
const EventBox = styled.div`
  width: 80px;
  height: 40px;
  background-color: #ffd46f;
  border-radius: 0.5rem;
`;

function Home() {
  const navigate = useNavigate();
  const userSeq = localStorage.getItem('userSeq') || 0
  const userType = localStorage.getItem('userType') || 'guest';
  const fetchLogInData = async (userSeq) => {
    switch(userType) {
      case 'customer':
        return await customerMain(userSeq);
      case 'designer':
        return await designerMain(userSeq);
      case 'guest':
      default:
        return await fetchMain(userSeq);  // seq 0을 넘겨줌
    }
  };
  const handleEvent = () => {
    if (userType !== 'customer') {
      swal("Error", "이벤트는 일반 회원만 가능합니다.", "error");
      return
    }
    navigate(`/event`)
  }
  const { data, isError, isLoading } = useQuery(['loginData', userSeq], () => fetchLogInData(userSeq));
  console.log(data, "메인 데이터");
  // const { isLoading, data, isError } = useQuery(["noLogInMain"], fetchMain);

  if (isLoading) {
    return <div>Loading...{data}</div>;
  }
  if (isError) {
    return <div>홈 페이지 에러{data}</div>;
  }

  if( localStorage.getItem("userType") == 'customer'){
    localStorage.setItem("userName", data.customerInfo.name);
  } 

  else if( localStorage.getItem("userType") == 'designer'){
    localStorage.setItem("userName", data.designerInfo.name);
  }
  

  return (
    <Wrapper>
      <Main>
        <ImgText>변화의 즐거움 <br/>Change hair & you</ImgText>
      </Main>

      <MainWrapper>
      <Title>이주의 인기! Weekly Best Designer ✨</Title>
      <DesignerBox>

      {/* 이부분 나중에 img로 태그 변경하기 */}
      {data.bestDesigner.map((item)=> (
        <ProfileBox 
          key={item.designerIdx}
          variants={pofolVariants}
					initial="nomal"
					whileHover="hover"
          onClick={() => navigate(`/designerdetail/${item.designerSeq}`)}
          >
          <ImgBox>
            <ProfileImg src={`${BASE_URL}/designer-profile/${item.img}`}></ProfileImg>
          </ImgBox>
          <Name>{item.name}디자이너</Name>
        </ProfileBox>
      ))
      }
      </DesignerBox>
      <EventBox onClick={handleEvent}>
        📷 Event
      </EventBox>
      </MainWrapper>
      
      <MainView />

    </Wrapper>
  );
}
export default Home;
