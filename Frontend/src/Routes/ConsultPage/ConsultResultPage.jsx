// 상담 종료 후 디자이너가 상담 결과 입력하는 페이지
// 입력할 때 selectedHairStyle에 커트랑 펌 종류 범위

import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { motion,AnimatePresence,useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: url('./img/password.jpg')no-repeat center center/cover, rgba(0, 0, 0, 0.7);
        background-blend-mode: multiply;
	background-size: cover ;
	width: 100vw;
  height: 95vh;  
  /* padding-top: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: end;
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
  display: flex;
  justify-content: center;
  opacity: 90%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10vh;
    margin-top: 20px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #e2c660;
  }
`;
const Wrapper = styled.div `
  width: 80%;
  text-align: start;
  /* align-items: center; */
`;
const HashTag = styled(motion.span)`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;
const typeBtnVariants = {
  normal: {},
  hover: {
    borderColor: "rgb(238, 117, 5)",
    color: "rgb(252, 156, 1)",
  },
  active: {
    borderColor: "rgb(0,0,0)",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(87, 73, 52)",
  },
};
const typeBtnVariants1 = {
  normal: {},
  hover: {
    borderColor: "rgb(238, 117, 5)",
    color: "rgb(252, 156, 1)",
  },
  active: {
    borderColor: "rgba(141, 136, 130, 0.808)",
    color: "rgb(56, 53, 53)",
    backgroundColor: "rgb(218, 214, 198)",
  },
};
const Hr =styled.hr`
  width: 100%;
  color: beige;
  margin-top: 20px;
  margin-bottom: 20px;
  opacity: 50%;
`
const CutBox = styled.div`
  margin-top: 40px;
`;
const PermBox = styled.div`

`;
const TextBox = styled.div`
  display: flex;
  align-items:center;
`;
const Circle = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  margin-bottom: 20px;
`;
const Text = styled.p`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const ImgBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Img = styled(motion.div)`
  width: 100px;
  height: 150px;
  border: 2px solid;
  border-radius: 0.2rem;
  object-fit: cover;
  &:hover {
    transform: scale(1.02);
  }
  &.selected {
    border-color: #e2bf66;
    box-shadow: 0.5rem;
  }
`;

const Variants = {
	nomal: {
		scale: 1,
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2
		},
	},
  selected: {
		scale: 1,
		opacity: 1,
	},
}

const ConsultBox=styled.input`
  width: 100% ;
  height: 200px;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  margin-bottom: 20px;
`;
const SubmitBtn = styled.button`
  text-align: center;
  border-radius: 7px;
  background: #574934;
  color: #f1efed;
  padding: 10px 25px;
  margin: 10px 0 25px 0;
  border: 0;
  font-size: 14px;
  width: 180px;
  transition: background-color, 0.3s ease;
  &:hover {
  background-color: #f0aa48;
  color: #f7f5e1;
  border-color: #574934;;
  }
`;


function ConsultResultPage(){
  const navigate = useNavigate();
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);
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
          }
      ]
  });
  
  const toggleCutType = (item) => {
      if (selectedCut.includes(item)) {
        setSelectedCut((prev) => prev.filter((resist) => resist !== item))
      } else {
        setSelectedCut((prev) => [...prev, item]);
      }
    };
    const togglePermType = (item) => {
      if (selectedPerm.includes(item)) {
        setSelectedPerm((prev) => prev.filter((resist) => resist !== item))
      } else {
        setSelectedPerm((prev) => [...prev, item]);
      }
    };
      // 사진 선택 코드
	const [selectedImgs, setSelectedImgs] = useState([]);
	const handleImageClick = (item) => {
    if (selectedImgs.includes(item.imgSeq)) {
    // 이미 선택된 이미지를 다시 클릭하면 선택 해제
      setSelectedImgs((prev) => prev.filter((imgSeq) => imgSeq !== item.imgSeq));
      } else {
        // 새로운 이미지를 선택
        setSelectedImgs((prev) => [...prev, item.imgSeq]);
      }
  };
  console.log(setSelectedImgs);
  console.log(selectedImgs);
  return(
    <Container>
      <TitleBox>
        <Title>퍼스널 헤어스타일 진단</Title>
      </TitleBox>
      <ResultForm>
      <Wrapper>
        <CutBox>
          <TextBox>
            <Circle src="./icon/orangecircle.png"></Circle>
            <Text>Cut Style 진단</Text>
          </TextBox>
          {data.CutHairStyle.map((item) => (
            <HashTag
            key={item.hairStyleSeq}
            onClick={() => toggleCutType(item)}
            variants={typeBtnVariants}
            initial="normal"
            whileHover="hover"
            animate={selectedCut.includes(item) ? "active" : "normal"}
            >#{item.hairStyleLabel}</HashTag>
            ))
          }
        </CutBox>
        <Hr></Hr>
        <PermBox>
          <TextBox>
            <Circle src="./icon/darkcircle.png"></Circle>
            <Text>Perm Style 진단</Text>
          </TextBox>
        {data.PermHairStyle.map((item) => (
            <HashTag
            key={item.hairStyleSeq}
            onClick={() => togglePermType(item)}
            variants={typeBtnVariants1}
            initial="normal"
            whileHover="hover"
            animate={selectedPerm.includes(item) ? "active" : "normal"}
            >#{item.hairStyleLabel}</HashTag>
            ))
          }
        </PermBox>
          <Hr></Hr>
          <TextBox>
            <Circle src="./icon/orangecircle.png"></Circle>
            <Text>추천 스타일 이미지 선택</Text>
          </TextBox>  
          <ImgBox>
            {data.imgs.map((item) => (
              <Img 
                key={item.imgSeq}
                variants={Variants}
								initial="nomal"
								whileHover="hover"
                onClick={() => handleImageClick(item)}
                className={selectedImgs.includes(item.imgSeq) ? "selected" : ""}
                >{item.img}</Img>))}
          </ImgBox>
          <Hr></Hr>
          <TextBox>
            <Circle src="./icon/darkcircle.png"></Circle>
            <Text>상담 상세 결과 작성</Text>
          </TextBox>
          <ConsultBox placeholder="상세 내용을 작성해주세요 :)"></ConsultBox>
          <TitleBox>
            <SubmitBtn onClick={() => navigate('/designermypage')}>완료</SubmitBtn>
          </TitleBox>
          
      </Wrapper>
      </ResultForm>
    </Container>

  );
};

export default ConsultResultPage;