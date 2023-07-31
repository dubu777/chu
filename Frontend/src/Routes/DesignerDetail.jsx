import {styled} from "styled-components";
import css from "../font/font.css"
import 'react-calendar/dist/Calendar.css'; // css import
import ReserveCalendar from "../components/ReservationComponent/Calendar";
import { useState } from "react";
import Calendar from "../components/ReservationComponent/Calendar";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	div:nth-child(1) {
    grid-column: span 2;
  }
	width: 70vw;
	margin: 40px 0;
`;
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
`;
const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	
`;
const DesignerInfoBox = styled.div`
	display: flex;
	justify-content: start;

`;
const DesignerImg = styled.img`
	width: 80px;
	margin-right: 10px;
`;
const DesignerNameWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
`;
const DesignerNameBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const DesignerName = styled.span`
	font-size: 16px;
	font-weight: bold;
	margin: 0 5px;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
	padding: 5px 10px;
	border: 2px solid rgb(244,153,26);
	border-radius: 5px;
	background-color: ${props => props.handlelike ? "rgba(244,153,26,0.43)" : "white"};
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
	
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Box = styled.div`
	display: flex;

`;
const CostIcon = styled.img`
  width: 21px;
  margin-right: 3px;
	margin-right: 5px;
`;
const Hr = styled.div`
	/* color: #383838; */
	border: 1px solid rgb(197, 197, 197);
	width:100%;
	margin: 10px 0;
`;
const InfoBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
`;
const Address = styled.span`
	font-size: 12px;
	font-weight: 600;
	color: gray;
	margin: 5px 0 5px 5px;
`;
const HashBox = styled.div`
	display: flex;
`;
const HashTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: rgba(196, 192, 192, 0.5);
  border-radius: 5px;
  margin-top:3px;
`;
const IntroTextArea = styled.span`
	padding: 20px 60px 20px 20px;
	background-color: rgb(248, 245, 240);
	font-size: 12px;
	font-weight: 600;
	border-radius: 10px;
	margin-top: 10px;
	width: 90%;
	height: 100px;
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
const ReviewWrap = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ReviewInfoBox = styled.div`
	display: flex;
	flex-direction: column;

`;
const ReviewIdBox = styled.div`
	font-size: 15px;
	font-weight: 500;
	margin-bottom: 10px;
`;
const SIcon = styled.img`
	width:15px;
	height: 15px;
	margin: 0 5px;
`;
const ReservWrap = styled.div`
	display: flex;
	justify-content: center;
	border-radius: 10px;
	background-color: rgb(248, 245, 240);
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
  /* justify-content: center; */
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
	width: 100%;
	height: 100px;
	resize: none;
	padding: 5px;
	&:focus {
		outline: 1px solid rgb(244,153,26);
	}
`;

const UploadBtn = styled.button`
	border: none;
	background-color:rgb(242,234,211);
	font-size: 14px;
	font-weight: 600;
	width: 90%;
	height: 40px;
	border-radius: 5px;
	margin-bottom: 5px;
`;
const ReservBtn = styled.button`
	border: none;
	background-color: rgba(242,153,26,0.53);
	font-size: 14px;
	font-weight: 600;
	width: 90%;
	height: 40px;
	border-radius: 5px;
	margin: 30px 0 5px 0;
`;
const SText = styled.span`
	font-size: 10px;
  font-weight: 600;
	display: flex;
	justify-content: start;
`;
const UploadBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;

`;
const StartBox = styled.div`
	display: flex;
	justify-content: start;
`;


function DesignerDetail() {
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
				<Wrap>
				<InfoWrapper>
					<DesignerInfoBox>
						<DesignerImg src="icon/designerimg.png"/>
						<DesignerNameWrap>
							<DesignerNameBox>
							<DesignerName>{data.name} 디자이너</DesignerName>
							<LikeBox onClick={toggleLike} handlelike={handleLike}>
								{handleLike ? (
									// 좋아요가 눌려있을 때 빨간색 하트 아이콘
									<Icon src="icon/hearto.png" />
								) : (
									// 좋아요가 눌려있지 않을 때 빈 하트 아이콘
									<Icon src="icon/heartx.png" />
								)}
								<Text>{data.likeCnt}</Text>
							</LikeBox>
							</DesignerNameBox>
							<Hr/>
							<Box>
								<CostIcon src="icon/money.png"/>
								<Text>{data.cost}</Text>
							</Box>
						</DesignerNameWrap>
					</DesignerInfoBox>
					<InfoBox>
						<Address>{data.address}</Address>
						<HashBox>
            {
              data.hairStyleLabel.map((tag, index) => (
                <HashTag key={index}>#{tag}</HashTag>
              ))
            }
          </HashBox>
					<IntroTextArea>{data.introduction}</IntroTextArea>
					</InfoBox>
				</InfoWrapper>
				<PofolWrap>
					<SubTitle>포트폴리오</SubTitle>
					<Hr/>
					<PofolImgBox>
						{
							repeat.map((item, index) => (
								<PofolImg key={index} src="img/hamzzi.png" />
							))
						}
					</PofolImgBox>
				</PofolWrap>
				<InfoBox>
					<SubTitle>별점</SubTitle>
					<Box>
						<Icon src="icon/star.png" />
						<Text>{data.allReviewScore}</Text>
					</Box>
					<SubTitle>상담후기</SubTitle>
				</InfoBox>
				<Hr/>
				{data.review.map((review, index) => (
				<ReviewInfoBox key={index}>
					<ReviewWrap>
						<ReviewInfoBox>
							<Box>
								<ReviewIdBox>
									{review.customerId}
								</ReviewIdBox>
								<SIcon src="icon/star.png" />
								<Text>{review.review_score}</Text>
							</Box>
							<Text>{review.reviewContent}</Text>
						</ReviewInfoBox>
						<Text>{review.consulting_date}</Text>
					</ReviewWrap>
					<Hr/>
				</ReviewInfoBox>
				))
				}
				</Wrap>
				<ReservWrap>
				<ResevBox>
					<SubTitle>예약날짜</SubTitle>
					<Hr/>
					<Calendar/>
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
					<SubTitle>전달사항</SubTitle>
					<Hr/>
					<TextArea placeholder="내용을 입력해주세요." />
					<SubTitle>상담 사진 등록</SubTitle>
					<Hr/>
					<UploadBtn>파일 업로드</UploadBtn>
					<SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>
					<ReservBtn>상담 예약하기</ReservBtn>
					<SText> - 예약취소 시, 24시간 이전에만 예약금 환불이 가능합니다.</SText>
					</ResevBox>
				</ReservWrap>
			</Wrapper>
		</Container>
  );
}


export default DesignerDetail;