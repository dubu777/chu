import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

function formatDateString(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;

}

function ReserveCalendar() {
    const [value, onChange] = useState(new Date());
    return (
      <div>
        <Calendar onChange={onChange} value={value} />
          <div>
            <p>{formatDateString(value)}</p>
          </div>
      </div>
    );
  }


export default ReserveCalendar;