import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { styled } from 'styled-components';
import moment from "moment";

function formatDateString(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;

}
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 100%;
  max-width: 650px;
  padding: 10px;
  border-radius: 3px;
`;

function ReserveCalendar() {
    const [value, onChange] = useState(new Date());
    const currDate = new Date();
    const currDateTime = moment(currDate).format('MM-DD');
    // console.log(value)
    return (
      <CalendarContainer>
        <Calendar 
        onChange={onChange} 
        value={value} 
        formatDay={(locale, date) => moment(date).format("DD")}
        // formatDay={(locale, date) => moment(date).format('D')}
        />
          <div>
            <p>{formatDateString(value)}</p>
          </div>
      </CalendarContainer>
    );
  }


export default ReserveCalendar;