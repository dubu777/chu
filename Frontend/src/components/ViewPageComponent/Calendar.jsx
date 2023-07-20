import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

function formatDateString(date) {
  // 년, 월, 일
  // const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // const options = {month: 'short', day: 'numeric'};
  // return new Date(date).toLocaleDateString('en-US', options);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;

}

function MyApp() {
    const [value, onChange] = useState(new Date());
    return (
      <div>
        <Calendar onChange={onChange} value={value} />
          <div>
            <p>선택 날짜: {formatDateString(value)}</p>
          </div>
      </div>
    );
  }


export default MyApp;