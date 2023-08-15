import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { changePwdCustomer, changePwdDesigner } from "../../apis/auth";
import { setFindPwd, setExistPwState } from "../../recoil/auth";


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

	// 여기에 seq 저장되어 있음
	const [seq, setFindPwResult] = useRecoilState(setFindPwd);
	const [usertype, setExistsPwState] = useRecoilState(setExistPwState);

	const [newPassword, setNewPassword] = useState('');
	const [checkNewPassword, setCheckNewPassword] = useState('');

	const navigate = useNavigate();

	const handleNewPassword = (event) => {
		setNewPassword(event.target.value);
	};

	const handleCheckNewPassword = (event) => {
		setCheckNewPassword(event.target.value);
	}

	const handleChangePassword = async () => {
		if(newPassword == checkNewPassword) {

			if(usertype === "customer"){
				try{
					const result = await changePwdCustomer(seq, newPassword);
					console.log(result);
					swal("  비밀번호 변경 성공 \n 새롭게 로그인을 시도해 주세요 🙂")
					navigate("/login");
				} catch (error){
					console.log(error);
				}
			}

			else if(usertype === "designer"){
				try{
					const result = await changePwdDesigner(seq, newPassword);
					console.log(result);
					swal("  비밀번호 변경 성공 \n 새롭게 로그인을 시도해 주세요 🙂")
					navigate("/login");
				} catch (error){
					console.log(error);
				}
			}

			else{
				alert("완전히 잘못되버림");
				navigate("/login");
			}
		}
		else{
			alert("비밀번호와 비밀번호 확인란을 한번 더 체크해주세요!");
		}
	}

	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Change Password</Title>
					<br></br>
					<Input placeholder="New password" type="password" value={newPassword} onChange={handleNewPassword}></Input>
					<Input placeholder="Check password" type="password" value={checkNewPassword} onChange={handleCheckNewPassword}></Input>
					<br></br>
					<Btn type="submit" onClick={handleChangePassword}>변경하기</Btn>
				</Box>
			</Wrapper>
		</Container>
	);
}

export default ChangePw;