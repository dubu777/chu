import styled from "styled-components";
import { useState } from 'react';
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { setAuthNumber } from "../../recoil/auth";

const Container = styled.div`
	background: url('./img/password.jpg');
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
	background-color: rgb(33, 25, 25, 0.4);
	color: black;
`;
const Input = styled.input`
	width: 65%;
	height: 50px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	margin-left: 10px;
	font-size: 18px;
	font-family: 'Caveat';
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



function AuthNum() {

	const [authNum, setAuthNumberResult] = useRecoilState(setAuthNumber);
	const [userInputAuthNum, setUserInputAuthNum] = useState('');
	const navigate = useNavigate();

	const handleCheckAuthNum = (event) => {
		if(userInputAuthNum == authNum){
			alert("인증에 성공하였습니다! 비밀번호 변경 페이지로 이동합니다!");
			navigate("/changepw");
		}
		else{
			alert("인증 비밀번호가 잘못 됐네요! 다시 이메일 인증을 시도해주세요!");
			navigate("/findpw");
		}
	}

	const handleInputChange = (event) => {
		setUserInputAuthNum(event.target.value);
	}

	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>인증번호 확인</Title>
					<br></br>
					<Input placeholder="인증번호 입력" value={userInputAuthNum} onChange={handleInputChange}></Input>
					<br></br>
						<Btn type="submit" onClick={handleCheckAuthNum}>확인</Btn>
				</Box>				
			</Wrapper>
		</Container>
	);
}

export default AuthNum;