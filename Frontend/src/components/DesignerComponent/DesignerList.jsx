import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

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
  flex-direction: column;
  margin-right: 20px;
  align-items: center;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
`;
const StarBox = styled(motion.div)`
  width: 200px;
  height: 35px;
  display: flex;
  align-items: center;
`;
const Intro = styled.span`
  font-size: 13px;
  font-weight: 500;
  margin-top: 0px;
`;
const Reviewer = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: grey;
  margin-top: 5px;
  margin-bottom: 5px;
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
  width: 18px;
  margin-right: 3px;
`;
const ReservBox = styled(motion.div)`
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(244, 153, 26);
  border-radius:5px;
  margin-top: 10px;
  cursor: pointer;
`;
const HeartBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding-left: 90px;
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
margin-right: 20px;
`;
const LikeBtn = styled.img`
  width: 27px;
  height: 27px;
  margin-right: 10px;
  cursor: pointer;
`;
function DesignerList(props) {
  const { data, sortOrder } = props;
  const navigate = useNavigate();
  // 필터에 따라 내림차순으로 정렬하는 함수
  const sortByLikeCnt = (designers) => {
    return designers.slice().sort((a, b) => b.likeCnt - a.likeCnt);
  };
  const sortByReviewScore = (designers) => {
    return designers.slice().sort((a, b) => b.reviewScore - a.reviewScore);
  };
  
  const sortByReviewCnt = (designers) => {
    return designers.slice().sort((a, b) => b.reviewCnt - a.reviewCnt);
  };
  // 정렬 기준에 따라 데이터를 정렬
  const sortedData = 
  sortOrder === "좋아요순" 
    ? sortByLikeCnt(data.designerList)
    : sortOrder === "평점순"
    ? sortByReviewScore(data.designerList)
    : sortOrder === "리뷰순"
    ? sortByReviewCnt(data.designerList)
    : data.designerList;
  
  const [liked, setLiked] = useState(false); // 좋아요 상태를 state로 관리
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); // 좋아요 상태를 토글
  };

  return (
    <div>
    {sortedData.map((item) => (
    <Container key={item.designerSeq}>
      <Hr/>
      <Wrap>
      <Wrapper>
        <Box>
          <DesignerImg 
            src="./icon/designerimg.png"
            onClick={() => navigate("/designerdetail")}
          />
        </Box>
        <InfoBox>
          <StarBox>
            <Name>{item.designerName}디자이너</Name>
            <Icon src="./icon/star.png"/>
            <Text>{item.reviewScore}</Text>
          </StarBox>
          <Intro>{item.introduction}</Intro>
          <Reviewer>방문자 리뷰 {item.reviewCnt}</Reviewer>
          <Box>
            {
              item.hairStyleLabel.map((tag, index) => (
                <HashTag key={index} >#{tag}</HashTag>
              ))
            }
          </Box>
        </InfoBox>
      </Wrapper>
      <LikeBox>
        <HeartBox>
        {item.liked ? (
          // 좋아요가 눌려있을 때 빨간색 하트 아이콘
          <LikeBtn src="./icon/hearto.png" onClick={handleLikeClick}/>
        ) : (
          // 좋아요가 눌려있지 않을 때 빈 하트 아이콘
          <LikeBtn src="./icon/heartx.png" onClick={handleLikeClick}/>
        )}
        <Text>{item.likeCnt}</Text>
        </HeartBox>
          <Box>
            <CostBox>
              <Icon src="./icon/money.png"/>
              <Text>{item.cost}</Text>
            </CostBox>
            <ReservBox whileHover={{backgroundColor: "rgb(244,153,26)"}}>
              <Icon src="./icon/reservBtn.png"/>
              <Text>예약</Text>
            </ReservBox>
          </Box>
        </LikeBox>
      </Wrap>
    </Container>
    ))}
    </div>
  )
}
export default DesignerList;