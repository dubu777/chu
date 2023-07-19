import styled from "styled-components";


const Container = styled.div`
	background: url('./findid.jpg');
	filter: invert(5%);
	/* background-repeat: no-repeat; */
	/* background-position: top center; */
	background-size: cover ;
	/* width: 1000px;
	height: 900px; */
	/* width: 100%; */
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
	/* opacity: 0.5; */
	color: black;
`;
const Input = styled.input`
	width: 70%;
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
	/* justify-content: center; */
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
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


function Findid() {
	return(
		<Container>
			<Wrapper>
				<Box>
					<h1>Find ID</h1>
					<br></br>
					<Input placeholder="Name"></Input>
					<br></br>
					<Input type="email" placeholder="e-mail"></Input>
					<Btn>확인</Btn>
				</Box>				
			</Wrapper>
		</Container>
	);
}

export default Findid;