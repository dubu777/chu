import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
	background: url('./img/password.jpg');
	filter: invert(7%);
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
	background-color: rgb(33, 25, 25, 0.4);
	color: black;
`;
const Title = styled.h1`
margin-top: 10px;
margin-bottom: 15px;
font-size: 30px;
`;
const Input = styled.input`
	width: 75%;
	height: 50px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	margin-top: 7px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const Box = styled.div`
	/* justify-content: center; */
	display: flex;
	align-items: center;
	margin-left: 10%;
	margin-right: 10%;
	flex-direction: column;
	margin-top: 20px;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:30%;
	height: 40px;
	margin-top: 15px;
	color: white;
	cursor: pointer;
`;



function FindPw() {
	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Find Password</Title>
					<Input placeholder="ID"></Input>
					<Input placeholder="Name"></Input>
					<Input type="email" placeholder="e-mail"></Input>
					<Btn><Link to="/authnum">email 인증</Link></Btn>
				</Box>
			</Wrapper>
		</Container>
	);
}

export default FindPw;