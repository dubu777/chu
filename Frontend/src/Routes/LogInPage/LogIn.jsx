import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
	background: url('./img/login.jpg');
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
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const P = styled.p`
	
`;
const LogInBox = styled.div`
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const SubmitBox = styled.div`
	display:flex;
	justify-content: space-between;
	margin-left: 12%;
	margin-right: 12%;
	color:white;
`;

const FindBox = styled.div`
	text-align: right;
	margin-right: 12%;
	color: white;
`;
function LogIn() {
	return(
		<Container>
			<Wrapper>
				<LogInBox>
				<Title>Log in</Title>
				<Input placeholder="ID"></Input>
				<br></br>
				<Input placeholder="Password"></Input>
				</LogInBox>
				<br></br>
				<SubmitBox>
					<P><Link to="/signup">Sign up</Link></P>
					<P><Link to="/signin">sign in</Link></P>
				</SubmitBox> 
				<br></br>
				<FindBox><Link to="/findid">Find id</Link></FindBox>
				<FindBox><Link to="/findpw">Find Password</Link></FindBox>
			</Wrapper>
		</Container>
	);
}

export default LogIn;