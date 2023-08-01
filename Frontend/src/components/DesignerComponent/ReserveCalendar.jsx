// 디자이너의 상담 캘린더 컴포넌트

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const Container = styled.div`
    /* text-align: center; */
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;  
  padding: 50px 20px 20px 20px;
`;
const CalendarBox = styled.div`
    
`;
// 캘린더 커스텀
const StyledCalendar = styled(Calendar)`
  width: 90%; 
  height: 90%;

`;
const Box = styled.div`

`;
const DateText = styled.p`

`;
const TimeBox = styled.div`
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Title = styled.h1`
    text-align: center;
    font-size : 20px ;
    padding-top: 30px;
    margin-bottom: 15px;
`;
const Hr = styled.hr`
  width : 80%;
  color: #afa582;
  opacity: 50%;
`;

const TimeButton = styled.button`
  border-radius:1.0rem;
  width: 65px;
  height: 35px;
  margin: 3px;
  border: ${props => props.selected ? 'none' : '1px solid lightgray'};
  background-color: ${props => props.selected ? '#7D705F' : 'white'}; 
  color: ${props => props.selected ? 'white' : 'black'}; 
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  }

  function generateTimeButtons(selectedDate, selectedTimes, setSelectedTimes) {
    const timeButtons = [];
    const startDate = new Date(selectedDate);
    startDate.setHours(9, 0, 0, 0); // 선택된 날짜의 시작 시간 (10:00 AM)

    const endDate = new Date(selectedDate);
    endDate.setHours(22, 30, 0, 0); // 선택된 날짜의 종료 시간 (10:00 PM)


    let currentTime = new Date(startDate);

    while (currentTime <= endDate) {
      const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
      const isSelected = selectedTimes[selectedDate.toISOString()]?.includes(formattedTime) || false;

        timeButtons.push(
            <TimeButton
                key={formattedTime}
                selected={isSelected}
                onClick={() => handleTimeButtonClick(selectedDate, formattedTime, isSelected, setSelectedTimes)}
            >
                {formattedTime}
            </TimeButton>
        );

        currentTime.setMinutes(currentTime.getMinutes() + 30); // 30분 간격으로 시간 증가
    }

    return timeButtons;
}
function handleTimeButtonClick(selectedDate, formattedTime, isSelected, setSelectedTimes) {
  setSelectedTimes(prevSelectedTimes => {
    const updatedSelectedTimes = { ...prevSelectedTimes };
    if (!updatedSelectedTimes[selectedDate.toISOString()]) {
        updatedSelectedTimes[selectedDate.toISOString()] = [];
    }
    if (isSelected) {
        updatedSelectedTimes[selectedDate.toISOString()] = updatedSelectedTimes[selectedDate.toISOString()].filter(time => time !== formattedTime);
    } else {
        updatedSelectedTimes[selectedDate.toISOString()] = [...updatedSelectedTimes[selectedDate.toISOString()], formattedTime];
    }
    return updatedSelectedTimes;
});
}

function ReserveCalendar(){
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState({});

     // 백엔드로 선택된 시간 보내는 함수
     const sendSelectedTimesToBackend = () => {
      // 선택된 시간들(selectedTimes)을 서버로 전송
      // 예를 들어, axios 또는 fetch를 사용하여 POST 요청 보내기
      // 서버로 전송하는 로직을 구현하기 위해서는 백엔드 API와의 연결 필요
      console.log("전송할 시간들:", selectedTimes);
      };
    return (
      <Container>
        <Title>상담 일정</Title>
        <Hr></Hr>
            <Wrapper>
                <CalendarBox>
                    <StyledCalendar onChange={date => setSelectedDate(date)} value={selectedDate} />
                </CalendarBox>
                <TimeBox>
                    {/* 시간 선택 박스 */}
                    {generateTimeButtons(selectedDate, selectedTimes, setSelectedTimes)}
                    <OkBtn onClick={() => console.log(selectedTimes)}>확인</OkBtn> {/* 확인 버튼 추가 */}
                </TimeBox>
            </Wrapper>
        </Container>
    );
}

export default ReserveCalendar;