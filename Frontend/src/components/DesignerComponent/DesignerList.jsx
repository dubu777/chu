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
function DesignerList({data}) {
  const [liked, setLiked] = useState(false); // 좋아요 상태를 state로 관리
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); // 좋아요 상태를 토글
  };
  // const {data, isLoading} = useQuery(["byRating"], getByRating)
  // const [data, setData] = useState(
  //   {
  //     "allCutHairStyle": [
  //         {
  //             "hairStyleSeq": 1,
  //             "hairStyleLabel": "젤리펌"
  //         },
  //         {
  //             "hairStyleSeq": 2,
  //             "hairStyleLabel": "히피펌"
  //         },
  //         {
  //             "hairStyleSeq": 3,
  //             "hairStyleLabel": "가르마펌"
  //         },
  //         {
  //             "hairStyleSeq": 4,
  //             "hairStyleLabel": "쉐도우펌"
  //         }
  //     ],
  //     "allPermHairStyle": [
  //         {
  //             "hairStyleSeq": 5,
  //             "hairStyleLabel": "레이어드컷"
  //         },
  //         {
  //             "hairStyleSeq": 6,
  //             "hairStyleLabel": "허쉬컷"
  //         },
  //         {
  //             "hairStyleSeq": 7,
  //             "hairStyleLabel": "가일컷"
  //         },
  //         {
  //             "hairStyleSeq": 8,
  //             "hairStyleLabel": "울프컷"
  //         }
  //     ],
  //     "designerListCnt": 3,
  //     "designerList": [
  //         {
  //             "designerSeq": 1,
  //             "designerImg": "202307211500",
  //             "reviewScore": 4.5,
  //             "designerName": "원영",
  //             "introduction": "여성 펌 전문 디자이너 원영입니다 ^_^",
  //             "reviewCnt": 3,
  //             "hairStyleLabel": [
  //                 "젤리펌",
  //                 "히피펌",
  //                 "가르마펌",
  //                 "쉐도우펌"
  //             ],
  //             "likeCnt": 1,
  //             "isLike": true,
  //             "cost": 5000
  //         },
  //         {
  //             "designerSeq": 2,
  //             "designerImg": "202307211503",
  //             "reviewScore": 0.0,
  //             "designerName": "시영",
  //             "introduction": "남성 커트 전문 디자이너 시영입니다.",
  //             "reviewCnt": 1,
  //             "hairStyleLabel": [],
  //             "likeCnt": 0,
  //             "isLike": false,
  //             "cost": 7000
  //         },
  //         {
  //             "designerSeq": 3,
  //             "designerImg": "202307211505",
  //             "reviewScore": 5.0,
  //             "designerName": "승종",
  //             "introduction": "남성 펌 전문 디자이너 승종입니다.",
  //             "reviewCnt": 1,
  //             "hairStyleLabel": [],
  //             "likeCnt": 0,
  //             "isLike": false,
  //             "cost": 6000
  //         }
  //     ]
  // }
  // )
  return (
    <div>
    {data.designerList.map((item) => (
    <Container key={item.designerSeq}>
      <Hr/>
      <Wrap>
      <Wrapper>
        <Box>
          <DesignerImg src="./icon/designerimg.png"/>
        </Box>
        <InfoBox>
          <Name>{item.designerName}디자이너</Name>
          <Intro>{item.introduction}</Intro>
          <Reviewer>방문자 리뷰{item.reviewCnt}</Reviewer>
          <Box>
            {
              item.hairStyleLabel.map((tag, index) => (
                <HashTag key={index} >#{tag}</HashTag>
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
              <Text>{item.cost}</Text>
            </CostBox>
          </Box>
        </InfoBox>
      </Wrapper>
      <LikeBox>
        {item.liked ? (
          // 좋아요가 눌려있을 때 빨간색 하트 아이콘
          <LikeBtn src="./icon/hearto.png" onClick={handleLikeClick}/>
        ) : (
          // 좋아요가 눌려있지 않을 때 빈 하트 아이콘
          <LikeBtn src="./icon/heartx.png" onClick={handleLikeClick}/>
        )}
        <Text>{item.likeCnt}</Text>
      </LikeBox>
      </Wrap>
    </Container>
    ))}
    </div>
  )
}
export default DesignerList;