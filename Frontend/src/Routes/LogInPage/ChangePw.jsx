import styled from "styled-components";
import { Link } from "react-router-dom";
import swal from "sweetalert";


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
	margin-top: 12px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const Box = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 15px;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:60%;
	height: 40px;
	margin-top: 20px;
	color: white;
	cursor: pointer;
`;



function ChangePw() {
	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Change Password</Title>
					<br></br>
					<Input placeholder="New password" type="password"></Input>
					<Input placeholder="Check password" type="password"></Input>
					<br></br>
					<Btn onClick={()=> swal("  비밀번호 변경 성공 \n 새롭게 로그인을 시도해 주세요 🙂")}><Link to="/login">변경하기</Link></Btn>
				</Box>
			</Wrapper>
		</Container>
	);
}

export default ChangePw;