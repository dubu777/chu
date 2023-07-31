// 디자이너의 상담 예약 리스트 컴포넌트

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;
`;
const Hr = styled.div`
  margin: 20px 0 20px 0;
  border-bottom : 2px solid rgba(0, 0, 0, 0.1);
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Wrapper = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;
const DesignerImg = styled.img`
  width: 100px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;
const Intro = styled.span`
  font-size: 13px;
  font-weight: 500;
  margin-top: 3px;
`;
const Reviewer = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: grey;
  margin-top: 3px;
  cursor: pointer;
`;
const HashTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: rgba(196, 192, 192, 0.5);
  border-radius: 5px;
  margin-top:3px;
`;
const Icon = styled.img`
  width: 21px;
  margin-right: 3px;
`;
const ReservBox = styled(motion.div)`
  width: 70px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(244, 153, 26);
  border-radius:5px;
  margin-top: 10px;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
const CostBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
margin-left: 20px;
`;
const LikeBtn = styled.img`
  width: 27px;
  height: 27px;
  margin-right: 10px;
  cursor: pointer;
`;
const EnterBtn = styled.button`
    
`;


function AllReserveList(){
    const [data, setdata] = useState({
        "consultingList" : [
            {
                "consultingSeq" : 1,
                "consultingDate" : "2023-07-19",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img1.png",
                "name" : "김싸피",
                "gender" : "남성",
                "faceLabel" : "계란형",
                "hairCondition" : [
                    "얇은 모발",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "img1.png",
                    "img2.png",
                    "img3.png"
                ]
            },
            {
                "consultingSeq" : 2,
                "consultingDate" : "2023-07-20",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img2.png",
                "name" : "송싸피",
                "gender" : "여성",
                "faceLabel" : "계란형",
                "hairCondition" : [
                    "얇은 모발",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "img1.png",
                    "img2.png",
                    "img3.png"
                ]
            },
        ] 
    })
    return(
        <Container>
      <Hr/>
      <Wrap>
      <Wrapper>
      {data.consultingList.map((item) => (
                <div key={item.consultingSeq}>
                    <Hr/>
                     <Box>
                        <DesignerImg src="./icon/designerimg.png"/>
                    </Box>
                    <Name>예약자 명: {item.name} </Name>
                    <Name> {item.gender}</Name>
                    <Text> 상담 일시: {item.consultingDate}</Text>
                    <ul>
                        {item.hairCondition.map((condition, index) => (
                            <HashTag key={index}>{condition}</HashTag>
                        ))}
                    </ul>
                    <EnterBtn>상담 입장</EnterBtn>
                </div>
                
            ))}
      </Wrapper>
      </Wrap>
    </Container>

    )
}

export default AllReserveList;