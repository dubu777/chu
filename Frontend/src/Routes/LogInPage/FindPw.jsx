import styled from "styled-components";


const Container = styled.div`
	background: url('./password.jpg');
	filter: invert(7%);
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
	background-color: rgb(33, 25, 25, 0.4);
	/* opacity: 0.5; */
	color: black;
`;
const Input = styled.input`
	width: 60%;
	height: 45px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	margin-top: 12px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const Box = styled.div`
	/* justify-content: center; */
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 10px;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:30%;
	height: 40px;
	margin-top: 20px;
	color: white;
	cursor: pointer;
`;



function Findpw() {
	return(
		<Container>
			<Wrapper>
				<Box>
					<h1>Find Password</h1>
					<Input placeholder="ID"></Input>
					<Input placeholder="Name"></Input>
					<Input type="email" placeholder="e-mail"></Input>
					<Btn>email 인증</Btn>
				</Box>
			</Wrapper>
		</Container>
	);
}

export default Findpw;