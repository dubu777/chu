import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	background: url('./img/findid.jpg');
	filter: invert(5%);
	background-size: cover ;
	width: 100vw;
  	height: 100vh;
	display:flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 150px;
	font-family: 'Cormorant Garamond';
`;

const Wrapper = styled.div`
	border: 0;
	border-radius: 0.8rem;
	width: 35%;
	height: 45%;
	background-color: rgb(242, 234, 211, 0.5);
	color: black;
`;
const Input = styled.input`
	width: 75%;
	height: 50px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	margin-left: 10px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const Box = styled.div`
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const Title = styled.h1`
margin-top: 10px;
margin-bottom: 15px;
font-size: 30px;
`;

const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:70%;
	height: 40px;
	margin-top: 30px;
	color: white;
	cursor: pointer;
`;


function FindId() {
	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Find ID</Title>
					<br></br>
					<Input placeholder="Name"></Input>
					<br></br>
					<Input type="email" placeholder="e-mail"></Input>
					<Btn type="submit">
						<Link to="/foundid">확인</Link>
					</Btn>
				</Box>				
			</Wrapper>
		</Container>
	);
}

export default FindId;