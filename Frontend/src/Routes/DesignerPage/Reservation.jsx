import { styled } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
// import Calendar from "../../components/ReservationComponent/Calendar";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {getPossibleTimeApi, getPortfolioShow} from "../../apis"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
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

const RigthWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 100%;
  margin: 40px 10px;
`;

const Hr = styled.div`
  border: 0.5px solid rgb(197, 197, 197);
  width: 95%;
  margin: 7px 0;
`;

const PofolWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 90%;
  margin-bottom: 10px;
`;
const SubTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin: 8px 0;
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
  height: 800px;
`;
const ResevBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
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
  display: flex;
  justify-content: center;
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
  width: 30%;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0 5px 0;
  cursor: pointer;
`;
const SText = styled.span`
  font-size: 10px;
  font-weight: 600;
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
  margin-top: 20px;
`;
const EmtyBox = styled.div`
  width: 100px;
  height: 80px;
`;
const SubmitImg = styled.input`
  margin: 15px 0px;
`;
function formatDateString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const clickdate = `${year}-${month}-${day}`;
  console.log(clickdate)
  return `${year}-${month}-${day}`;
}


function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedSelectedDate = formatDateString(selectedDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const { designerSeq } = useParams();

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

  const PofolImgs = [
    "img/pofol1.jpg",
    "img/pofol2.jpg",
    "img/pofol3.jpg",
    "img/pofol4.jpg",
    "img/pofol5.jpg",
    "img/pofol6.jpg",
    "img/pofol7.jpg",
    "img/pofol8.jpg",
    "img/pofol9.jpg",
  ];
  const OPofolImgs = [
    "img/opofol1.jpg",
    "img/opofol2.jpg",
    "img/opofol3.jpg",
    "img/opofol4.jpg",
    "img/opofol5.jpg",
    "img/opofol6.jpg",
    "img/opofol7.jpg",
    "img/opofol8.jpg",
    "img/opofol9.jpg",
  ];
  
  // 시간 데이터 호출
  const { data: data, isError: Error, isLoading: Loading } = useQuery(
    ['possibleTime', designerSeq],
    () => getPossibleTimeApi(designerSeq)
  );
  
  // 포트폴리오 이미지 호출
  const { data: imgData, isError: imgError, isLoading: imgLoading } = useQuery(
    ['portfolio', designerSeq],
    () => getPortfolioShow(designerSeq)
  );
    console.log('포트폴리오 왔니' , imgData)

  const generateTimeButtons = () => {
    const timeButtons = [];
    const startTime = 9; // 시작 시간 (9:00)
    const endTime = 22.5; // 종료 시간 (22:30)

    for (let i = startTime; i <= endTime; i += 0.5) {
      const hour = Math.floor(i);
      const minute = (i - hour) * 60;
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

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
          {formattedTime}
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

  console.log('전달메세지 모냐', note)

  const [selectedImgs, setSelectedImgs] = useState([]);
  const handleImageClick = (item) => {
    if (selectedImgs.includes(item)) {
      // 이미 선택된 이미지를 다시 클릭하면 선택 해제
      setSelectedImgs((prev) => prev.filter((img) => img !== item));
    } else {
      // 새로운 이미지를 선택
      setSelectedImgs((prev) => [...prev, item]);
    }
  };
  console.log('우와 시간 나옴?', formattedSelectedDate,selectedTime)

  // 상담 이미지 첨부
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadButtonClick = () => {
    if (selectedFile) {
      // 여기에 파일 업로드 로직을 추가하세요.
      console.log("Selected file:", selectedFile);
      // 파일 업로드 API 호출 등의 처리를 수행하면 됩니다.
    } else {
      console.log("No file selected.");
    }
  };
  if (imgLoading) {
    return <div>Loading...{data}</div>;
  }
  if (imgError) {
    return <div>홈 페이지 에러{data}</div>;
  }
  return (
    <Container>
      <LeftWrap>
        <ReservWrap>
          <ResevBox>
            <SubTitle>예약날짜</SubTitle>
            <Hr />
            <CalendarContainer>
              {/* <Calendar onChange={onChange} value={value} onClick={handleCalendarClick}/> */}
              <Calendar onChange={date => setSelectedDate(date)} value={selectedDate} />
              <div>
                <p>{formattedSelectedDate}</p>
              </div>
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
      <RigthWrap>
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
                    src={item}
                    variants={pofolVariants}
                    initial="nomal"
                    whileHover="hover"
                    onClick={() => handleImageClick(item)}
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
                    src={item}
                    variants={pofolVariants}
                    initial="nomal"
                    whileHover="hover"
                    onClick={() => handleImageClick(item)}
                  />
                ))}
              </StyledSlider>
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
                      <SImg src={item} />
                    </SImgBox>
                  ))}
                </AnimatePresence>
              </StartBox>
            </PofolWrap>
            <StartBox>
              <SubTitle>상담 사진 등록</SubTitle>
            </StartBox>
            <Hr />
                  <SubmitImg
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
            <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>
            <Hr />
            <ReservBtn>상담 예약하기</ReservBtn>
            <SText>
              {" "}
              - 예약취소 시, 24시간 이전에만 예약금 환불이 가능합니다.
            </SText>
          </ResevBox>
        </ReservWrap>
      </RigthWrap>
    </Container>
  );
}
export default Reservation;
