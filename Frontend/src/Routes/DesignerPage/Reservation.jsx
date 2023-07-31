import {styled} from "styled-components";
import 'react-calendar/dist/Calendar.css'; // css import
import { useState } from "react";
import Calendar from "../../components/ReservationComponent/Calendar";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
  flex-direction: column;
	width: 50vw;
	margin: 40px 0;
`;


const Hr = styled.div`
	/* color: #383838; */
	border: 1px solid rgb(197, 197, 197);
	width:90%;
	margin: 10px 0;
`;

const PofolWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	margin-bottom: 10px;
`;
const SubTitle = styled.span`
	font-size: 15px;
	font-weight: 700;
	margin: 8px 0;
`;
const PofolImgBox = styled.div`
	display: flex;
	justify-content: space-around;
`;
const PofolImg = styled.img`
	width: 90px;
`;

const ReservWrap = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
	border-radius: 10px;
	background-color: rgb(248, 245, 240);
  /* background-color: white; */
	padding: 20px 0;
`;
const ResevBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
`;
const TimeSelectionContainer = styled.div`
  display: flex;
  margin: 2px 0 0 12px;
	flex-wrap: wrap;
`;
const TimeBox = styled.div`
	display: flex;
	justify-content: center;
`;
const TimeButton = styled.button`
  margin: 5px 4px;
  padding: 5px 12px;
	display: flex;
	border: none;
	border-radius: 5px;
	background-color: rgb(242,234,211);
  align-items: center;
  justify-content: center;
	font-size: 12px;
`;
const TextArea = styled.textarea`
	border: 1px solid rgb(207, 200, 192);
	border-radius: 10px;
	background-color: none;
	width: 90%;
	height: 100px;
	resize: none;
	padding: 5px;
  margin-bottom: 10px;
	&:focus {
		outline: 1px solid rgb(244,153,26);
	}
`;

const UploadBtn = styled.button`
	border: none;
	background-color:rgb(242,234,211);
	font-size: 14px;
	font-weight: 600;
	width: 40%;
	height: 40px;
	border-radius: 5px;
	margin: 10px 0 5px 0;
`;
const ReservBtn = styled.button`
	border: none;
	background-color: rgba(242,153,26,0.53);
	font-size: 14px;
	font-weight: 600;
	width: 40%;
	height: 40px;
	border-radius: 5px;
	margin: 10px 0 5px 0;
`;
const SText = styled.span`
	font-size: 10px;
  font-weight: 600;
	display: flex;
	justify-content: start;
`;

const StartBox = styled.div`
	display: flex;
	justify-content: start;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
`;

function Reservation() {
	const [handleLike, setHandleLike] = useState(false); // 좋아요 상태를 state로 관리
	const repeat = [1,2,3,4,5]
	const [data, setData] = useState({
		"designerSeq" : 1,
		"name" : "소희",
		"introduction" : "고객님의 이미지 맞춤으로 트랜디한 스타일을 찾아드리겠습니다.",
		"address" : "대전 봉명동",
		"salonName" : "Chu헤어",
		"designerImg" : "",
		"allReviewScore" : 4.8,
		"likeCnt" : 78,
		"isLike" : true,
		"hairStyleLabel" : [
								"레이어드컷",
								"복구펌",
								"히피펌",
								"C컬"
		],
		"portfolio" : [
				{
						"imgSeq" : 1,
						"imgName" : "img1.png",
						"sequence" : 1
				},
				{
						"imgSeq" : 2,
						"imgName" : "img2.png",
						"sequence" : 2
				},
		],
		"review" : [
				{
						"customerIdx" : 1,
						"consulting_date" : "2022.12.15 17:54",
						"review_score" : 4.7,
						"customerId" : "ssafy",
						"reviewContent" : "좋아요!"
				},
				{
					"customerIdx" : 2,
					"consulting_date" : "2022.12.16 17:54",
					"review_score" : 4.5,
					"customerId" : "wjh1224",
					"reviewContent" : "덕문에 인생 머리 찾았어요!"					
				}
		],
		"cost" : 5000
			
	})
  const toggleLike = () => {
    setHandleLike((prev) => !prev); // 좋아요 상태를 토글
  };


	const [selectedTime, setSelectedTime] = useState(null);

  const hours = Array.from({ length: 14 }, (_, index) => index + 9);
  const minutes = ['00', '30'];

  const timeSlots = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      const time = `${hour.toString().padStart(2, '0')}${minute}`;
      timeSlots.push(time);
    });
  });

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };
  return(
		<Container>
			<Wrapper>
				<ReservWrap>
          <Wrap>
            <ResevBox>
              <SubTitle>예약날짜</SubTitle>
              <Hr/>
              <Calendar/>
            </ResevBox>
            <ResevBox>
              <SubTitle>예약시간</SubTitle>
              <Hr/>
              <TimeBox>
              <TimeSelectionContainer>
                {timeSlots.map((time, index) => (
                  <TimeButton
                    key={index}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </TimeButton>
                ))}
              </TimeSelectionContainer>
              </TimeBox>
            </ResevBox>
          </Wrap>
          <ResevBox>
            <SubTitle>전달사항</SubTitle>
            <Hr/>
            <TextArea placeholder="내용을 입력해주세요." />
            <PofolWrap>
              <SubTitle>상담에 적용할 사진을 골라주세요</SubTitle>
              <Hr/>
              <PofolImgBox>
                {
                  repeat.map((item, index) => (
                    <PofolImg key={index} src="img/hamzzi.png" />
                  ))
                }
              </PofolImgBox>
            </PofolWrap>
            <StartBox>
            <SubTitle>상담 사진 등록</SubTitle>
            </StartBox>
            <Hr/>
            <UploadBtn>파일 업로드</UploadBtn>
            <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>
            <Hr/>
            <ReservBtn>상담 예약하기</ReservBtn>
            <SText> - 예약취소 시, 24시간 이전에만 예약금 환불이 가능합니다.</SText>
					</ResevBox>
				</ReservWrap>
			</Wrapper>
		</Container>
  );
}


export default Reservation;