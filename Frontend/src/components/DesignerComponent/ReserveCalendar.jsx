// 디자이너의 상담 캘린더 컴포넌트

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {postReserveCalendar} from "../../apis/designer";
import {getPossibleTimeApi} from "../../apis/reservation"
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
const Container = styled.div`
    /* text-align: center; */
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;  
  padding: 10px 20px 20px 20px;
`;
const CalendarBox = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
    
`;
// 캘린더 커스텀
const StyledCalendar = styled(Calendar)`
  width: 90%; 
  height: 90%;
  /* margin-left: 10px; */

`;
const Box = styled.div`

`;
const DateText = styled.p`

`;
const TimeBox = styled.div`
    width: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;
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
const BtnBox = styled.div`
  text-align: center;
  
`;
const Title = styled.h1`
    text-align: center;
    font-size : 20px ;
    padding-top: 30px;
    margin-bottom: 15px;
`;

const InfoBtn = styled.p`
  font-size: 15px;
`;
const Hr = styled.hr`
  width : 90%;
  color: #afa582;
  opacity: 50%;
  margin-bottom: 20px;
`;
const IconWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
`;
const IconBox = styled.div`
  display: flex;
  margin-left: 30px;
  /* justify-content: flex-start; */
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
// 
const TimeButton = styled(motion.button)`
  border-radius: 1.0rem;
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
const OkBtn = styled.button`
margin-top: 20px;
  width : 130px;
  height: 30px;
  border: 0;
  background-color: #7D705F;
  color: white;
  border-radius: 0.2rem;
`;

function formatDateString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const Calendar = `${year}-${month}-${day}`;
  // console.log(Calendar)
  return `${year}-${month}-${day}`;
}

function ReserveCalendar(){
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedDateString = formatDateString(selectedDate);
  const formattedSelectedDate = formatDateString(selectedDate);
  const [dateAndTimes, setDateAndTimes] = useState({}); // 변경된 부분
  const[finalSelect, setFinalSelect] = useState({});
  const {designerSeq} = useParams();
  console.log('ds',designerSeq)

  const generateTimeButtons = () => {
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
          selected={selectedTimes[selectedDateString]?.includes(formattedTime)} // 변경된 부분
          style={{
            backgroundColor: selectedTimes[selectedDateString]?.includes(formattedTime) ? "rgb(100, 93, 81)" : "white",
            color: selectedTimes[selectedDateString]?.includes(formattedTime) ? "white" : "black",
          }}
        >
          {formatTime}
        </TimeButton>
      );
    }
    return timeButtons;
  };

    // 시간 데이터 호출
    const ClickCalendarDate = async(designerSeq, selectedDateString) => {
      console.log('디자이너', designerSeq, '날짜', selectedDateString)
      try{
        console.log('try 페이지에 들어온 seq', selectedDateString)
        const response  = await getPossibleTimeApi(designerSeq, selectedDateString);
        console.log('시간 조회', response)
        
        setSelectedTimes((prevSelectedTimes) => {
          const newSelectedTimes = { ...prevSelectedTimes };
          
          // 기존에 추가된 중복 시간을 필터링
          if (newSelectedTimes[selectedDateString]) {
            newSelectedTimes[selectedDateString] = newSelectedTimes[selectedDateString].filter(time =>
              response.some(item => item.state === 'P' && item.time === time)
            );
          }
          
          // 받아온 시간 데이터를 selectedTimes에 추가
          response.forEach(item => {
            if (item.state === 'P') {
              if (!newSelectedTimes[selectedDateString]) {
                newSelectedTimes[selectedDateString] = [];
              }
              if (!newSelectedTimes[selectedDateString].includes(item.time)) {
                newSelectedTimes[selectedDateString].push(item.time);
              }
            }
          });
    
          return newSelectedTimes;
        });
      }catch(error){
        console.error("API Error:", error);
      }
      
    };
    
    const handleTimeButtonClick = (time) => {
      setSelectedTimes((prevSelectedTimes) => {
        const newSelectedTimes = { ...prevSelectedTimes };
        if (!newSelectedTimes[selectedDateString]) {
          newSelectedTimes[selectedDateString] = [];
        }
        if (newSelectedTimes[selectedDateString].includes(time)) {
          newSelectedTimes[selectedDateString] = newSelectedTimes[selectedDateString].filter((t) => t !== time);
        } else {
          newSelectedTimes[selectedDateString] = [...newSelectedTimes[selectedDateString], time];
        }
        return newSelectedTimes;
      });
    };

  // 선택한 시간을 등록
  const handleApplyButtonClick = async() => {

    if(selectedTimes) {
    try {
      console.log('날짜 시간 결과 보여줜',selectedTimes)
      const response = await postReserveCalendar(designerSeq, selectedTimes);
      console.log(response)
    } catch (error) {
      console.error("캘린더 통신 실패", error)
      // swal("Error", "시간 설정에 실패했습니다.", "error");
    }
  }
};
    return (
      <Container>
        <Title>예약 시간 캘린더</Title>
        <Hr></Hr>
            <Wrapper>
                <CalendarBox>
                  <IconWrap>
                    <IconBox>
                      <Icon src="/icon/calendar.png"></Icon>
                      <InfoBtn>날짜 선택</InfoBtn>
                    </IconBox>
                    <Hr></Hr>
                  </IconWrap>
                      <StyledCalendar 
                      onChange={date => {
                        setSelectedDate(date);
                        const selectedDateString = formatDateString(date);
                        ClickCalendarDate(designerSeq, selectedDateString);
                      }} 
                      value={selectedDate} 
                      />
                      {/* {selectedDateString} */}
                </CalendarBox>
                <TimeBox>
                <IconWrap>
                  <IconBox>
                      <Icon src="/icon/clock.png"></Icon>
                      <InfoBtn>시간 선택</InfoBtn>
                  </IconBox>
                  </IconWrap>
                  <Hr></Hr>
                    <BtnBox>
                    {/* 시간 선택 박스 */}
                    {generateTimeButtons()}
                    </BtnBox>
                    <OkBtn onClick={handleApplyButtonClick}>적용</OkBtn> {/* 확인 버튼 추가 */}
                </TimeBox>
            </Wrapper>
        </Container>
    );
}

export default ReserveCalendar;