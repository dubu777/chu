// 고객이 좋아요 누른 디자이너 목록 컴포넌트

import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getLikeDesignerList, toggleLikeButton } from "../../apis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`;
const Hr = styled.div`
  margin: 20px 0 20px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
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
  margin-top: 3px;
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
  border-radius: 5px;
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
const HeartBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding-left: 90px;
`;
function LikeDesigner() {
  const customerSeq = localStorage.getItem("userSeq");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //designerList를 키로 가진 query를 무효화 하여 새로운 데이터를 받아오게함
  const mutation = useMutation(toggleLikeButton, {
    onSuccess: () => {
      queryClient.invalidateQueries("likeDesigner");
    },
  });

  const handleLikeClick = (designerSeq, currentLikeStatus) => {
    const newLikeStatus = !currentLikeStatus;
    mutation.mutate({ designerSeq, customerSeq, isLike: newLikeStatus });
  };
  const { data, isLoading, isError } = useQuery(
    ["likeDesigner", customerSeq],
    () => getLikeDesignerList(customerSeq)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }
  console.log(data,"좋아요한 디자이너 됐다!");
  return (
    <>
      {data &&
        data.designerList &&
        data.designerList.map((data) => (
          <Container>
            <Hr />
            <Wrap>
              <Wrapper>
                <Box>
                  <DesignerImg
                    // src="/icon/designerimg.png" 
                    src= {`https://i9b111.q.ssafy.io/api/designer-profile/${data.designerImg}}`}
                    onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  />
                </Box>
                <InfoBox>
                  <Name
                    onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  >
                    {data.designerName}
                  </Name>
                  <Intro>{data.introduction}</Intro>
                  <Reviewer>방문자 리뷰 {data.reviewCnt}</Reviewer>
                  <Box>
                    {data.hairStyleLabel.map((tag) => (
                      <HashTag>#{tag}</HashTag>
                    ))}
                  </Box>
                  <Box>
                    <ReservBox
                      whileHover={{ backgroundColor: "rgb(244,153,26)" }}
                    >
                      <Icon src="/icon/reservBtn.png" />
                      <Text>예약</Text>
                    </ReservBox>
                    <CostBox>
                      <Icon src="/icon/money.png" />
                      <Text>{data.cost}</Text>
                    </CostBox>
                  </Box>
                </InfoBox>
              </Wrapper>
              <HeartBox>
        {data.isLike ? (
          // 좋아요가 눌려있을 때 빨간색 하트 아이콘
          <LikeBtn src="/icon/hearto.png" onClick={() => handleLikeClick(data.designerSeq, data.isLike)}/>
        ) : (
          // 좋아요가 눌려있지 않을 때 빈 하트 아이콘
          <LikeBtn src="/icon/heartx.png" onClick={() => handleLikeClick(data.designerSeq, data.isLike)}/>
        )}
        <Text>{data.likeCnt}</Text>
        </HeartBox>
            </Wrap>
          </Container>
        ))}
    </>
  );
}
export default LikeDesigner;
