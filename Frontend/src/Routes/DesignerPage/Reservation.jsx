import { styled } from "styled-components";
import Calendar from "react-calendar";
import '../../components/ReservationComponent/Calendar.css'
// import "react-calendar/dist/Calendar.css"; 
// import Calendar from "../../components/ReservationComponent/Calendar";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {getPossibleTimeApi, getPortfolioShow, postReserveImg, postReserveInfo } from "../../apis"
import {reserveInfo, consultImg} from "../../recoil"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../apis/rootUrl";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 60px;
  background-color: rgba(230, 227, 227, 0.3);
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 900px;
  margin: 40px 10px;

`;
const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 900px;
  margin: 40px 10px;

`;
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hr = styled.div`
  border: 0.5px solid rgb(197, 197, 197);
  width: 100%;
  margin: 7px 0;
`;

const PofolWrap = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 90%;
  margin-bottom: 20px;
`;
const SubTitle = styled.span`
  font-size: 18px;
  margin: 10px 0 3px 0;
  font-family: 'Sandol-B';
  // letter-spacing: 0.5px;
`;
const StyledSlider = styled(Slider)`
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
    height: 100%;
  }
  .slick-prev {
    z-index: 1;
    left: -26px;
  }

  .slick-next {
    right: -23px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.5;
    color: #a1a1a1;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: -13px;

    li button:before {
      color: #acaaa9;
    }

    li.slick-active button:before {
      color: #353535;
    }
  }
`;
const PofolImg = styled(motion.img)`
  width: 100px;
  height: 125px;
  border-radius: 5px;
  object-fit: cover;
`;

const ReservWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 30px -4px rgb(0 0 0 / 0.1);
  background: #fdfdfd;
  padding: 20px 0;
  height: 100%;
`;

const ResevBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 5px;
`;
const TimeSelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  /* justify-content: center; */
  margin-bottom: 10px;
`;
const TimeButton = styled(motion.button)`
  border-radius:1.0rem;
  width: 62px;
  height: 35px;
  margin: 3px;
  border: ${props => props.selected ? 'none' : '1px solid lightgray'};
  background-color: ${props => props.selected ? '#7D705F' : 'white'}; 
  color: ${props => props.selected ? 'white' : 'black'}; 
  cursor: pointer;
  :hover {
    border: orange;
    color: orange;

  }

`;

const TimeBox = styled.div`
  width:100%;
`;

const TextArea = styled.textarea`
  border: 1px solid rgb(207, 200, 192);
  border-radius: 0.4rem;
  background-color: none;
  width: 95%;
  height: 100px;
  resize: none;
  padding: 10px;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 10px;
  &:focus {
    outline: 1px solid rgb(244, 153, 26);
  }
`;

const UploadBtn = styled.button`
  border: 0px solid rgb(244, 153, 26);
  background-color: #f2ead3;
  font-size: 14px;
  font-weight: 600;
  width: 30%;
  height: 40px;
  border-radius: 1px;
  margin: 10px 0 5px 0;
  cursor: pointer;
`;
const ReservBtn = styled.button`
  border: none;
  background-color: rgb(100, 93, 81);
  color: white;
  font-size: 14px;
  font-weight: 500;
  width: 50%;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0 5px 0;
  cursor: pointer;
`;
const SText = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin-top: 5px;
  display: flex;
  justify-content: start;
`;

const StartBox = styled.div`
  display: flex;
  justify-content: center;
`;
const pofolVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};
const timeBtnVariants = {
  nomal: {
    backgroundColor: "rgb(255, 251, 235)",
    borderColor: "#fcd34d",
  },
  hover: {
    backgroundColor: "rgb(242,234,211)",
    borderColor: "#f59e0b",
    color: "#f59e0b",
  },
  active: {
    backgroundColor: "rgb(242,234,211)",
    borderColor: "#f59e0b",
    color: "#f59e0b",
  },
};
const SImgBox = styled(motion.div)`
  width: 50px;
  height: 60px;
  margin: 10px;
`;
const SImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const selectedVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  }, 
  selected: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const SelectedBox = styled.div`
  display: flex;
  justify-content: center;
`;
const EmtyBox = styled.div`
  width: 100px;
  height: 80px;
`;
const SubmitImg = styled.input`
  border-radius: 5px;
  margin: 15px 0px 5px 0px;
  width: 90%;
  height: 100px;
  background-color: rgb(242,234,211);
  font-size:13px;
  padding: 40px 85px;
  
`;

function formatDateString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const clickdate = `${year}-${month}-${day}`;
  // console.log(clickdate)
  return `${year}-${month}-${day}`;
}


function Reservation() {
  const customerSeq = localStorage.getItem('userSeq')
  const userType = localStorage.getItem('userType')
  const [info, setInfo] = useRecoilState(reserveInfo); // 예약 정보 담는 recoil
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedSelectedDate = formatDateString(selectedDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState(""); 
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [selectedImgSeqs, setSelectedImgSeqs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [consultingSeq, setConsultingSeq] = useState(null);
  const [pofolnum, setPofolNum] = useState(null);
  const { designerSeq } = useParams();
  const [requestFile, setRequestFile] = useState(null);
  const [imgSeqArray, setImgSeqArray] = useState(null)
  const navigate = useNavigate();

  // 넘기고 싶은 데이터 모으기
  const handleButtonClick = async() => {

    if (userType !== 'customer') {
      swal("Error", "예약은 일반회원만 가능합니다.", "error");
      return;
    }
    const selectedImgSeqs = selectedImgs.map((item) => {
      // designerPortfolio 배열에서 이미지 검색
      const selectedFromDesignerPortfolio = imgData.designerPortfolio.find((image) => image.imgName === item);
      // randomPortfolio 배열에서 이미지 검색
      const selectedFromRandomPortfolio = imgData.randomPortfolio.find((image) => image.imgName === item);
      
      // 이미지가 designerPortfolio 또는 randomPortfolio 어느 배열에서나 찾아진 경우
      if (selectedFromDesignerPortfolio) {
        return selectedFromDesignerPortfolio.imgSeq;
      } else if (selectedFromRandomPortfolio) {
        return selectedFromRandomPortfolio.imgSeq;
      }
      return 1; // 해당 이미지를 찾지 못한 경우
    });
  
    console.log("선택한 이미지들의 imgSeq 배열:", selectedImgSeqs);
    const combinedData = {
      customerSeq: customerSeq,
      designerSeq: designerSeq,
      date: formattedSelectedDate,
      time: selectedTime,
      consultingMemo: note,
      portfolios: selectedImgSeqs,
    };
    console.log('보내기 전 info', combinedData)
    // 예약정보 보내기
    try {
      console.log('페이지 try')
      await setInfo((prevInfo) => ({
        ...prevInfo,
        ...combinedData,
      }));

      const response  = await postReserveInfo(combinedData);
      console.log('정보보보',response);
      setConsultingSeq(response)
      //예약 정보 이미지 보내기
      if (response) {
        console.log('response왔어?', response)
        const formData = new FormData();
        formData.append("img", requestFile);

        try{
          console.log('try 페이지에 들어온 seq', response)
          const response1  = await postReserveImg(response, formData);
          console.log('이미지미지', response1);
          swal("Success", "결제페이지로 이동합니다.", "success")
        }catch(error){
          console.error("Img Send Error:", error);
        }
      }
      navigate('/checkreserve')
    } catch(error){
      console.log(error)
    }
  };

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ClickCalendarDate = async(designerSeq, selectedDateString) => {
    console.log('디자이너', designerSeq, '날짜', selectedDateString)
    try{
      console.log('try 페이지에 들어온 seq', selectedDateString)
      const data  = await getPossibleTimeApi(designerSeq, selectedDateString);
      console.log('시간 데이터 조회 성공', data)
      generateTimeButtons(data)
    }catch(error){
      console.error("API Error:", error);
    }
  };
  
  // 포트폴리오 이미지 호출
  const { data: imgData, isError: imgError, isLoading: imgLoading } = useQuery(
    ['portfolio', designerSeq],
    () => getPortfolioShow(designerSeq),
    {
      stale: true, // 데이터가 변경되어도 캐시된 데이터를 사용
    }
  );

  const [selectedTimes, setSelectedTimes] = useState({}); 
  const generateTimeButtons = (data) => {
    console.log('들어왔?',data)
    const timeButtons = [];
    const startTime = 9; // 시작 시간 (9:00)
    const endTime = 22.5; // 종료 시간 (22:30)

    for (let i = startTime; i <= endTime; i += 0.5) {
      const hour = Math.floor(i);
      const minute = (i - hour) * 60;
      const second = Math.floor(((i - hour) * 60 - minute) * 60);
      const formatTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
      
      timeButtons.push(
        <TimeButton
          key={formattedTime}
          variants = {timeBtnVariants}
          onClick={() => handleTimeButtonClick(formattedTime)}
          style={{
            backgroundColor: selectedTime === formattedTime ? "rgb(100, 93, 81)" : "white",
            color: selectedTime === formattedTime ? "white" : "black",
          }}
        >
          {formatTime}
        </TimeButton>
      );
    }
    return timeButtons;
  };

  const handleTimeButtonClick = (time) => {
    setSelectedTime(time);
  };

  // 여기부터는 예약 전달 메세지 로직
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleImageClick = (item) => { // imgName이 선택된 배열에 포함되어있으면 
    if (selectedImgs.includes(item)) {
      // 이미 선택된 이미지를 다시 클릭하면 선택 해제
      setSelectedImgs((prev) => prev.filter((imgName) => imgName !== item));
    } else {
      // 새로운 이미지를 선택
      setSelectedImgs((prev) => [...prev, item]);
    }
  };

  // 상담 이미지 첨부
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRequestFile(file);
    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
      // setRequestFile(file);
    } else {
      swal("⚠️ Image 파일 형식을 선택해주세요 :)");
    }
  };
  // console.log('원하는 사진명:', selectedImgs)
        
        if (imgLoading) {
          return <div>Loading...{imgData}</div>;
        }
        if (imgError) {
          return <div>홈 페이지 에러{imgData}</div>;
  }
  // console.log('데이터가 무슨이름으로 들어오니', imgData.designerPortfolio)
  // console.log('최종 예약 이미지',formData)

  return (
    <Container>
      <LeftWrap>
        <ReservWrap>
          <ResevBox>
            <SubTitle>예약날짜</SubTitle>
            <Hr />
            <CalendarContainer>
              {/* <Calendar onChange={onChange} value={value} onClick={handleCalendarClick}/> */}
              {/* <Calendar onChange={date => setSelectedDate(date)} value={selectedDate} /> */}
              <Calendar 
                      onChange={date => {
                        setSelectedDate(date);
                        const selectedDateString = formatDateString(date);
                        ClickCalendarDate(designerSeq, selectedDateString);
                      }} 
                      value={selectedDate} 
                      />
            </CalendarContainer>
          </ResevBox>
          <ResevBox>
            <SubTitle>예약시간</SubTitle>
            <Hr />
              <TimeBox>
                <TimeSelectionContainer>
                  {generateTimeButtons()}
                </TimeSelectionContainer>
              </TimeBox>
            <SubTitle>전달사항</SubTitle>
            <Hr />
            <TextArea 

              placeholder="내용을 입력해주세요." 
              value={note} 
              onChange={handleNoteChange}
              /> 
          </ResevBox>
        </ReservWrap>
      </LeftWrap>
      <RightWrap>
        <ReservWrap>
          <ResevBox>
            <PofolWrap>
              <StartBox>
                <SubTitle>디자이너 포트폴리오</SubTitle>
              </StartBox>
              <Hr />
              <StyledSlider {...settings}>
                {imgData.designerPortfolio.map((item, index) => (
                  <PofolImg
                    key={index}
                    // src={item}
                    src={`${BASE_URL}/portfolio/${item.imgName}`}
                    variants={pofolVariants}
                    initial="nomal"
                    whileHover="hover"
                    onClick={() => handleImageClick(item.imgName)}
                  />
                ))}
              </StyledSlider>
            </PofolWrap>
            <PofolWrap>
              <StartBox>
                <SubTitle>다른 디자이너 포트폴리오</SubTitle>
              </StartBox>
              <Hr />
              <StyledSlider {...settings}>
                {imgData.randomPortfolio.map((item, index) => (
                  <PofolImg
                    key={index}
                    src={`${BASE_URL}/portfolio/${item.imgName}`}
                    variants={pofolVariants}
                    initial="nomal"
                    whileHover="hover"
                    onClick={() => handleImageClick(item.imgName)}
                  />
                ))}
              </StyledSlider>
            </PofolWrap>
            <PofolWrap>
              <SelectedBox>
                <SubTitle>선택한 사진</SubTitle>
              </SelectedBox>
              <Hr />
              <StartBox>
                <AnimatePresence>
                  {selectedImgs.map((item, index) => (
                    <SImgBox
                      key={index}
                      variants={selectedVariants}
                      initial="initial"
                      animate="selected"
                      exit="exit"
                      onClick={() => handleImageClick(item)}
                    >
                      {/* 수정 필요 코드 */}
                      {/* <SImg src={item} /> */}
                      <SImg src={`${BASE_URL}/portfolio/${item}`} />
                      {/* <p>{item}</p> */}
                    </SImgBox>
                  ))}
                </AnimatePresence>
              </StartBox>
            </PofolWrap>
            <ResevBox>
              <StartBox>
                <SubTitle>상담 사진 등록</SubTitle>
              </StartBox>
                <Hr/>
                <SubmitImg
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
              <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>
            </ResevBox>
            <ResevBox>
              <Hr/>
                <ReservBtn onClick={handleButtonClick}>상담 예약하기</ReservBtn>
                <SText>
                  {" "}
                  - 예약취소 시, 24시간 이전에만 예약금 환불이 가능합니다.
                </SText>
            </ResevBox>
            </ResevBox>
          </ReservWrap>
        </RightWrap>
    </Container>
  );
}
export default Reservation;
