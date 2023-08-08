import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { styled } from 'styled-components';

function formatDateString(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;

}
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 3px;
`;

function ReserveCalendar() {
    const [value, onChange] = useState(new Date());
    // console.log(value)
    return (
      <CalendarContainer>
        <Calendar onChange={onChange} value={value} />
          <div>
            <p>{formatDateString(value)}</p>
          </div>
      </CalendarContainer>
    );
  }


export default ReserveCalendar;