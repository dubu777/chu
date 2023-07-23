// 여기는 디자이너 예약 상세 페이지

import {styled} from "styled-components";
import css from "../font/font.css"
import 'react-calendar/dist/Calendar.css'; // css import
import ReserveCalendar from "../components/ReservationComponent/Calendar";

const Container = styled.div`
	display: flex;

    
`;
const Wrapper = styled.div`
	border: #f6f7e5;
	width: 100px;
	height: 100px;
	background-color: #ffffff;

    
`;
const box = styled.div`
    
`;

function Reservation() {
  return(
    <Container>
			<Wrapper>ss</Wrapper>
			<Wrapper></Wrapper>
			<ReserveCalendar/>
		</Container>
  );
}


export default Reservation;