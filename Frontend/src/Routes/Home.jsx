import { styled } from "styled-components";
import css from "../font/font.css";
import MainView from "../components/HomeComponent/MainView";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { BASE_URL } from "../apis/rootUrl";
import { fetchMain, customerMain, designerMain } from "../apis";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useInView } from "react-intersection-observer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  background-image: url("/img/password.jpg");
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
  /* font-family: sans-serif; */
  font-family: "Abril Fatface";
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
  border: 2px solid #bd9a7f;
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

const Title = styled(motion.div)`
  font-family: sans-serif;
  font-size: 25px;
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
  object-fit: cover;
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

const EventWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EventText = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EventTitle = styled.p`
  font-size: 60px;
  margin-bottom: 20px;
`;
const EventIntro = styled.p`
  font-size: 22px;
  margin-bottom: 5px;
`;
const EventImg = styled.img`
  width: 270px;
  height: 400px;
  border-radius: 0.1rem;
  /* margin-right: 30px; */
`;
const EventImg1 = styled.img`
  width: 600px;
  height: 400px;
  border-radius: 0.1rem;
`;

const EventBox = styled.div`
  width: 200px;
  height: 50px;
  background-color: #605b52;
  border-radius: 0.1rem;
  color: white;
  text-align: center;
  align-items: center;
  margin-top: 25px;
  padding-top: 15px;
  font-size: 22px;
  cursor: pointer;
`;
const pofolVariants = {
  nomal: {
    scale: 1,
    opacity: 1,
    y: -5,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: -5 },
};
function Home() {
  const navigate = useNavigate();
  const userSeq = localStorage.getItem("userSeq") || 0;
  const userType = localStorage.getItem("userType") || "guest";
  const [inViewRef, inView] = useInView({
    // triggerOnce: true,  // 애니메이션을 한 번만 실행합니다.
    threshold: 0.1, // 요소의 10%가 뷰포트에 들어왔을 때 애니메이션을 시작합니다.
  });

  const fetchLogInData = async (userSeq) => {
    switch (userType) {
      case "customer":
        return await customerMain(userSeq);
      case "designer":
        return await designerMain(userSeq);
      case "guest":
      default:
        return await fetchMain(userSeq); // seq 0을 넘겨줌
    }
  };
  const handleEvent = () => {
    if (userType !== "customer") {
      swal("Error", "이벤트는 일반 회원만 가능합니다.", "error");
      return;
    }
    navigate(`/event`);
  };
  const { data, isError, isLoading } = useQuery(["loginData", userSeq], () =>
    fetchLogInData(userSeq)
  );
  // 인덱스에 따른 딜레이 애니메이션
  const getDelayByIndex = (index) => {
    const baseDelay = 0.2; // 기본 딜레이
    const increment = 0.1; // 각 항목에 추가되는 딜레이 양
    return baseDelay + index * increment;
  };
  if (isLoading) {
    return <div>Loading...{data}</div>;
  }
  if (isError) {
    return <div>홈 페이지 에러{data}</div>;
  }

  if (localStorage.getItem("userType") == "customer") {
    localStorage.setItem("userName", data.customerInfo.name);
  } else if (localStorage.getItem("userType") == "designer") {
    localStorage.setItem("userName", data.designerInfo.name);
  }

  return (
    <Wrapper>
      <Main>
        <ImgText>
          변화의 즐거움 <br />
          Change hair & you
        </ImgText>
      </Main>

      <MainWrapper>
        <Title
          ref={inViewRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          이주의 인기! Weekly Best Designer ✨
        </Title>
        <DesignerBox>
          {data.bestDesigner.map((item, index) => {
            const delayForItem = getDelayByIndex(index);

            const itemVariants = {
              ...pofolVariants,
              nomal: {
                ...pofolVariants.nomal,
                transition: {
                  ...pofolVariants.nomal.transition,
                  delay: delayForItem,
                },
              },
            };

            return (
              <ProfileBox
                key={index}
                ref={inViewRef}
                initial="hidden"
                animate={inView ? "nomal" : "hidden"}
                whileHover="hover"
                variants={itemVariants}
                onClick={() => navigate(`/designerdetail/${item.designerSeq}`)}
              >
                <ImgBox>
                  <ProfileImg
                    src={`${BASE_URL}/designer-profile/${item.img}`}
                  ></ProfileImg>
                </ImgBox>
                <Name>{item.name}디자이너</Name>
              </ProfileBox>
            );
          })}
        </DesignerBox>
        <EventBox onClick={handleEvent}>📷 Event</EventBox>

        <EventWrapper>
          <EventText>
            <EventTitle>For You</EventTitle>
            <EventIntro>Chu만의 헤어스타일 합성 서비스</EventIntro>
            <EventIntro>#헤어스타일 체험 #마이 헤어</EventIntro>
            <EventBox onClick={handleEvent}>Go 한장 한장</EventBox>
          </EventText>
          <EventImg src="/img/hairtool.jpg" />
          <EventImg1 src="/img/hair3.jpeg" />
        </EventWrapper>
      </MainWrapper>

      {/* <MainView /> */}
      {/* <MainView /> */}
    </Wrapper>
  );
}
export default Home;
