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

const Text = styled.h3`
	margin: 50px 0px;

`;
const TopBox = styled.div`
	/* justify-content: center; */
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const BottomBox = styled.div`
	display: flex;
	justify-content: center;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:30%;
	height: 40px;
	/* margin-top: 30px; */
	color: white;
	cursor: pointer;
	margin: 40px 10px;
`;


function FoundId() {
	return(
		<Container>
			<Wrapper>
				<TopBox>
					<h1>Find ID</h1>
					<Text>ooo님의 아이디는 'ssafy12' 입니다.</Text>
				</TopBox>
				<BottomBox>
					<Btn>로그인</Btn>
					<Btn>비밀번호 찾기</Btn>
				</BottomBox>	
			</Wrapper>
		</Container>
	);
}
export default FoundId;