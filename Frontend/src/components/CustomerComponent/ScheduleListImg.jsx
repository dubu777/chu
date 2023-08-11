// 회원 예약 정보
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getCustomerMyPage } from "../../apis";
import { styled } from "styled-components";
import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionIdState } from "../../recoil/openvidu";

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
  margin-left: 25px;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const DateText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  color: #2d2d2d;
`;


const ReservBtn = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(244, 153, 26);
  border-radius: 5px;
  margin: 15px 15px 0 0;
  padding: 5px 10px;
  font-weight: 600;
  background-color: white;
`;
const ReservBtnVariant = {
  nomal: {
    backgroundColor: "white",
    color: "black"
  },
  hover: {
    backgroundColor: "rgb(244,153,26)",
    color: "white"
  }
}

function ScheduleListImg(){
  const customerSeq = localStorage.getItem("userSeq");
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const { data, isLoading, isError } = useQuery(
    ["customerMyPage", customerSeq],
    () => getCustomerMyPage(customerSeq)
  );

  const moveToWrapper = (consultingSeq) => {
    console.log("나이거보내고싶어", consultingSeq);
      navigate(`/viduroom/${consultingSeq}`);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }

  return (
    <>
      {/* {data &&
        data.responseFutureConsultingDtoList &&
        data.responseFutureConsultingDtoList.map((data) => ( */}
          <Container>
            <Wrap>
              <Wrapper>
                <Box>
                  <DesignerImg
                    src="/icon/designerimg.png" 
                    // onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  />
                </Box>
                <InfoBox>
                  <Name
                    // onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  >
                    지윤
                  </Name>
                  <DateText>08.21 금 08:30~07:00</DateText>
                  <Box>
                    <ReservBtn
                      variants={ReservBtnVariant}
                      initial="nomal"
                      whileHover="hover"
                    // onClick={() => moveToWrapper(item.consultingSeq)}
                    onClick={() => moveToWrapper(1)}>
                      상담 참여
                    </ReservBtn>
                    <ReservBtn
                      variants={ReservBtnVariant}
                      initial="nomal"
                      whileHover="hover"
                      >
                      상담 취소
                    </ReservBtn>
                  </Box>
                </InfoBox>
              </Wrapper>
            </Wrap>
          </Container>
        {/* ))} */}
    </>
  );
};

export default ScheduleListImg;
