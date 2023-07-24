// 고객의 최근 상담 내역 보여주는 컴포넌트

import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
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
  display: flex;
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
`;
function ReserveList() {
  const hashTag = ["레이어드컷", "히피펌", "아이롱펌"]
  const [liked, setLiked] = useState(false); // 좋아요 상태를 state로 관리
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); // 좋아요 상태를 토글
  };
  
  return (
    <Container>
      <Hr/>
      <Wrap>
      <Wrapper>
        <Box>
          <DesignerImg src="./icon/designerimg.png"/>
        </Box>
        <InfoBox>
          <Name>재현 디자이너</Name>
          <Intro>남자 펌, 아이롱펌 전문 디자이너 재현입니다.</Intro>
          <Reviewer>방문자 리뷰 132</Reviewer>
          <Box>
            {
              hashTag.map((tag) => (
                <HashTag>#{tag}</HashTag>
              ))
            }
          </Box>
          <Box>
            <ReservBox whileHover={{backgroundColor: "rgb(244,153,26)"}}>
              <Icon src="./icon/reservBtn.png"/>
              <Text>예약</Text>
            </ReservBox>
            <CostBox>
              <Icon src="./icon/money.png"/>
              <Text>10,000</Text>
            </CostBox>
          </Box>
        </InfoBox>
      </Wrapper>
      </Wrap>
    </Container>
  )
}
export default ReserveList;