// 여기는 디자이너 예약 상세 페이지

import {styled} from "styled-components";
import css from "../font.css"
import MyApp from "../components/ViewPageComponent/Calendar";

const Container = styled.div`
	display: flex;

    
`;
const Wrapper = styled.div`
	border: black;
	width: 100px;
	height: 100px;
	background-color: black;

    
`;
const box = styled.div`
    
`;

function Reservation() {
  return(
    <Container>
			<Wrapper>ss</Wrapper>
			<Wrapper></Wrapper>
			<MyApp/>
		</Container>
  );
}


export default Reservation;