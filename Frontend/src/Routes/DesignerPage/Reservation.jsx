import { styled } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
// import Calendar from "../../components/ReservationComponent/Calendar";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {getPossibleTimeApi} from "../../apis"
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
`;

const RigthWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 100%;
  margin: 40px 10px;
`;

const Hr = styled.div`
  border: 1px solid rgb(197, 197, 197);
  width: 100%;
  margin: 10px 0;
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
`;
const TimeBox = styled.div`
  display: flex;
  justify-content: center;
`;
const TimeButton = styled(motion.button)`
  margin: 5px 4px;
  padding: 5px 12px;
  width: 14.25%;
  display: flex;
  border: 1px solid grey;
  border-radius: 1px;
  background-color: rgb(242, 234, 211);
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
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

function formatDateString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const clickdate = `${year}-${month}-${day}`;
  console.log(clickdate)
  return `${year}-${month}-${day}`;
}

function Reservation() {
  const [handleLike, setHandleLike] = useState(false); // 좋아요 상태를 state로 관리
  const { designerSeq } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["possibleTime", designerSeq],
    (designerSeq, clickdate) => getPossibleTimeApi(designerSeq) 
  );

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
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  // const selectedDateString = formatDateString(selectedDate);

  const hours = Array.from({ length: 14 }, (_, index) => index + 9);
  const minutes = ["00", "30"];
  const timeSlots = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      const time = `${hour.toString().padStart(2, "0")}:${minute}`;
      timeSlots.push(time);
    });
  });
  // const handleDateSelect = (date) => {
  //   setSelectedDate(date);
  // };

  const Api = (value) => {
  };

  const handleTimeClick = (time) => {
    // 이미 선택된 시간과 같으면 선택 해제
    setSelectedTime((prevTime) => (prevTime === time ? null : time));
  };
  // 사진 선택 코드
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
  return (
    <Container>
      <LeftWrap>
        <ReservWrap>
          <ResevBox>
            <SubTitle>예약날짜</SubTitle>
            <Hr />
            <CalendarContainer>
              <Calendar onChange={onChange} value={value} onClick={Api()}/>
              <div>
                <p>{formatDateString(value)}</p>
              </div>
            </CalendarContainer>
          </ResevBox>
          <ResevBox>
            <SubTitle>예약시간</SubTitle>
            <Hr />
            <TimeBox>
              <TimeSelectionContainer>
                {timeSlots.map((time, index) => (
                  <TimeButton
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    variants={timeBtnVariants}
                    initial="nomal"
                    whileHover="hover"
                    animate={selectedTime === time ? "active" : "nomal"}
                  >
                    {time}
                  </TimeButton>
                ))}
              </TimeSelectionContainer>
            </TimeBox>
            <SubTitle>전달사항</SubTitle>
            <Hr />
            <TextArea placeholder="내용을 입력해주세요." />
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
                {PofolImgs.map((item, index) => (
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
                {OPofolImgs.map((item, index) => (
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
            <UploadBtn>파일 업로드</UploadBtn>
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
