import { Link, useNavigate } from "react-router-dom";
import { setFindId, setExistState } from "../../recoil/auth";
import { useRecoilState } from "recoil";
import { findId } from "../../apis/auth";
import React, { useState } from 'react';
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

	const [username, setUsername] = useState('');
	const [useremail, setuseremail] = useState('');

	const [findIdResult, setFindIdResult] = useRecoilState(setFindId);
	const [existState, setExistsState] = useRecoilState(setExistState);
	
	const navigate = useNavigate();

	const handleFindId = async () => {
		console.log('Username:', username);
		console.log('Useremail:', useremail);

		try{
			const result = await findId(username, useremail);
			console.log(result);
			setFindIdResult(result.id);
			setExistsState(result.exists);
			alert("success!");
			navigate("/foundid");
		} catch(error){
			console.error(error);
			// 라우팅 처리
			alert("fail!!!!!!!!");
		}
	}

	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Find ID</Title>
					<br></br>
					<Input placeholder="Name"
						   value={username}
						   onChange={(e) => setUsername(e.target.value)}
					></Input>
					<br></br>
					<Input type="email" 
						   placeholder="e-mail"
						   value={useremail}
						   onChange={(e) => setuseremail(e.target.value)}
					></Input>
					<Btn type="submit"
						 onClick={handleFindId}>
						확인
					</Btn>
				</Box>				
			</Wrapper>
		</Container>
	);
}

export default FindId;