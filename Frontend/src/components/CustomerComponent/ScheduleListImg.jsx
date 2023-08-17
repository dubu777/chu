// 회원 예약 정보
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { createNotification, getCustomerMyPage, reservationCancel } from "../../apis";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionIdState } from "../../recoil/openvidu";
import Swal from 'sweetalert2';
import { BASE_URL } from "../../apis";

const ReserveWrapper = styled(motion.div)`
  display: flex;
  border: 2px solid gray;
  margin: 160px auto 50px auto;
  width: 60%;
  border-radius: 0.7rem;
  background-color: #f9f5f0;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`;
const ReservBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 10px auto;
  &:last-child{
    & .separator {
      display: none;
    }
  }
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
  height: 120px;
  object-fit: cover;
  border-radius:2px;
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
  color: #454545;
  margin-right: 10px;
`;
const DateBox = styled.div`
  display: flex;
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

const None = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
function ScheduleListImg({initial, animate, variants, transition}){
  const customerSeq = localStorage.getItem("userSeq");
  const userType = localStorage.getItem('userType')
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const { data, isLoading, isError, refetch } = useQuery(
    ["customerMyPage", customerSeq],
    () => getCustomerMyPage(customerSeq)
  );

  const moveToWrapper = (consultingSeq) => {
    console.log("나이거보내고싶어", consultingSeq);
      navigate(`/viduroom/${consultingSeq}`);
  }

  const handleCancel = async (consultingSeq) => {
    try {
      const result = await Swal.fire({
        title: '상담을 취소하시겠습니까?',
        text: "취소한 상담은 복구할 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요'
      });
  
      // '네' 버튼을 눌렀을 경우에만 로직을 실행
      if (result.isConfirmed) {
        // 알림 생성
        const notificationResult = await createNotification(consultingSeq, userType);
        console.log(notificationResult, "알림생성");
    
        // 상담 취소
        const reservationResult = await reservationCancel(consultingSeq);
        console.log(reservationResult, "상담취소");
        refetch();
      }
      } catch (error) {
        console.error("API 호출 실패", error);
      }
    
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }
  console.log(data, "고객 마이페이지 조회`");
  return (
    <ReserveWrapper 
    initial={initial} 
    animate={animate} 
    variants={variants} 
    transition={transition}>
  <Container>
    {data && data.responseFutureConsultingDtoList && data.responseFutureConsultingDtoList.length > 0 ? (
      data.responseFutureConsultingDtoList
        .filter(item => item.cancelDate === null)
        .map((data) => (
          <ReservBox key={data.consultingSeq}>
            <Wrap>
              <Wrapper>
                <Box>
                  <DesignerImg
                    src={`${BASE_URL}/designer-profile/${data.designerImg}`}
                    onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  />
                </Box>
                <InfoBox>
                  <Name
                    onClick={() => navigate(`/designerdetail/${data.designerSeq}`)}
                  >
                    {data.name}
                  </Name>
                  <DateText>{data.consultingDate} {data.consultingStartTime}</DateText>
                  <Box>
                    <ReservBtn
                      variants={ReservBtnVariant}
                      initial="nomal"
                      whileHover="hover"
                      onClick={() => moveToWrapper(data.consultingSeq)}
                    >
                      상담 참여
                    </ReservBtn>
                    <ReservBtn
                      variants={ReservBtnVariant}
                      initial="nomal"
                      whileHover="hover"
                      onClick={() => handleCancel(data.consultingSeq)}
                    >
                      상담 취소
                    </ReservBtn>
                    <ReservBtn
                      variants={ReservBtnVariant}
                      initial="nomal"
                      whileHover="hover"
                      onClick={() => navigate(`/worldcuproom/${data.consultingSeq}`)}>
                      헤어스타일 월드컵
                    </ReservBtn>
                  </Box>
                </InfoBox>
              </Wrapper>
            </Wrap>
            <Hr className='separator'/>
          </ReservBox>
        ))
    ) : (
      <None>예약내역이 존재하지 않습니다.</None>
    )}
  </Container>
</ReserveWrapper>
  );
};

export default ScheduleListImg;

