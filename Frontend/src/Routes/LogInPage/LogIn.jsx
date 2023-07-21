import styled from "styled-components";


const Container = styled.div`
	background: url('./img/login.jpg');
	filter: invert(5%);
	background-size: cover ;
	height: 900px;
	display:flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 150px;
	font-family: 'Cormorant Garamond';
`;

const Wrapper = styled.div`
	border: 0;
	border-radius: 0.8rem;
	width: 40%;
	height: 40%;
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
	font-size: 18px;
	font-family: 'Cormorant Garamond';
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
	margin-left: 50px;
	margin-right: 50px;
	color:white;
`;

const FindBox = styled.div`
	text-align: right;
	margin-right: 50px;
	color: white;
`;
function SignIn() {
	return(
		<Container>
			<Wrapper>
				<LogInBox>
				<h1>Log in</h1>
				<Input placeholder="ID"></Input>
				<br></br>
				<Input placeholder="Password"></Input>
				</LogInBox>
				<SubmitBox>
					<p>Sign up</p>
					<p>Log in</p>
				</SubmitBox> 
				<br></br>
				<FindBox>Fing Id</FindBox>
				<FindBox>Find Password</FindBox>
			</Wrapper>
		</Container>
	);
}

export default SignIn;