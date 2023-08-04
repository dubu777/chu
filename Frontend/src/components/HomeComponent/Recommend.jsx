import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import motion from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, useIsLoggedIn } from "../../recoil/auth";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
  margin: 30px 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RecommendImg = styled.img`
	width: 150px;
	margin-right: 20px;
`;
const UnRecommendImg = styled.img`
	width: 150px;
	margin-right: 20px;
  filter: blur(6px);
`;
const ImgDiv = styled.div`
  width: 150px;
  margin-right: 10px;
`;
const ImgBox = styled.div`
  display: flex;
`;

const Text = styled.span`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;
function Recommend(){
  const Imgs = [
    "img/opofol1.jpg",
    "img/opofol2.jpg",
    "img/opofol3.jpg",
    "img/opofol4.jpg",
    "img/opofol5.jpg",
    "img/opofol6.jpg",
  ]
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const navigate = useNavigate();
  return(
  
  
    <Container>
      { isLogIn ?
      <Wrapper>
      <Text>계란형 얼굴에는 이런 헤어스타일이 잘 어울려요</Text>
      <ImgBox>
      {Imgs.map((item, index) => (
        <RecommendImg src={item} key={index}/>
      ))}
      </ImgBox>
      </Wrapper>
      : 
      <Wrapper>
      <Text>얼굴형에 맞는 헤어스타일을 추천 받으러 가기!</Text>
      <ImgBox>
      {Imgs.map((item, index) => (
        <UnRecommendImg 
          onClick={() => navigate('/login')}
          src={item} 
          key={index}/>
      ))}
      </ImgBox>
      </Wrapper>
      }
    </Container>
  )
}

export default Recommend;