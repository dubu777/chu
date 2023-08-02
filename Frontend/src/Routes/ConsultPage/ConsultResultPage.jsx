// 상담 종료 후 디자이너가 상담 결과 입력하는 페이지
// 입력할 때 selectedHairStyle에 커트랑 펌 종류 범위

import React from "react";
import { styled } from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 700px;
  /* height: 100%; */
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: end;
  opacity: 60%;
  text-align: center;
  align-items: center;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 22px;
  color: white;
`;
const ResultForm = styled.div`
  height: 75%;
  width: 35%;
  background-color: white;
  border-radius: 2rem;
`;
const Wrapper = styled.div `
  
`;

const CutBox = styled.div`

`;
const PermBox = styled.div`

`;
const ImgBox = styled.div`
  
`;
const Img = styled.div`

`;
function ConsultResultPage(){
  const [data, setdata] = useState(
    {
      "CutHairStyle" : [
          {
              "hairStyleSeq" : 1,
              "hairStyleLabel" : "레이어드컷"
          },
          {
              "hairStyleSeq" : 2,
              "hairStyleLabel" : "중단발"
          },
          {
              "hairStyleSeq" : 3,
              "hairStyleLabel" : "단발"
          }
      ],
      "PermHairStyle" : [
          {
              "hairStyleSeq" : 10,
              "hairStyleLabel" : "열펌"
          },
          {
              "hairStyleSeq" : 11,
              "hairStyleLabel" : "히피펌"
          },
          {
              "hairStyleSeq" : 12,
              "hairStyleLabel" : "열펌"
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
  });
  console.log(data.CutHairStyle)
  return(
    <Container>
      <TitleBox>
        <Title>퍼스널 헤어스타일 진단</Title>
      </TitleBox>
      <ResultForm>
      <Wrapper>
        <CutBox>
          {data.CutHairStyle.map((item) => (
                  <div key={item.hairStyleSeq}>{item.hairStyleLabel}</div>))}
        </CutBox>
        <PermBox>
          {data.PermHairStyle.map((item) => (
                  <div key={item.hairStyleSeq}>{item.hairStyleLabel}</div>))}
        </PermBox>
        <ImgBox>
          {data.imgs.map((item) => (
                  <div key={item.imgSeq}>{item.img}</div>))}
        </ImgBox>
        {/* <img src="./img/main.png" alt="ss" /> */}
        <Img></Img>
      </Wrapper>
      </ResultForm>
    </Container>

  );
};

export default ConsultResultPage;