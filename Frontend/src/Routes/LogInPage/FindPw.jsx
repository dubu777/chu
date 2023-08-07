import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { customerFindPw, designerFindPw } from "../../apis/auth";
import { setFindPwd, setExistPwState, setAuthNumber } from "../../recoil/auth";

import emailjs from "emailjs-com";

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
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 10px;
`;

const CustomRadio = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: ${(props) => (props.checked ? "#333" : "transparent")};
  cursor: pointer;
`;

const TypeLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;


function FindPw() {
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");
	const [useremail, setuseremail] = useState("");
	const [userType, setUserType] = useState("");

	const [findPwResult, setFindPwResult] = useRecoilState(setFindPwd);
	const [existPwState, setExistsPwState] = useRecoilState(setExistPwState);
	const [authNum, setAuthNumberResult] = useRecoilState(setAuthNumber);

	const navigate = useNavigate(); 
	
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFindPw = async () => {
	if(userId != null && username != null && useremail != null){
		if (userType === "customer") {
			try {
				const result = await customerFindPw(userId, username, useremail);
				console.log(result);
				setFindPwResult(result.seq);
				setExistsPwState(userType);
				// 여기서 이메일 보내기

				let confirmNumber = Math.floor(Math.random() * 900001) + 100000;

				let templateParams = {
					user_email: useremail,
					sys_code: confirmNumber,
				};
				emailjs.init("c0nz-ynLc-qYrorYn");
				emailjs.send("service_chu", "template_chu", templateParams);
				setAuthNumberResult(confirmNumber);
				navigate("/authnum");
			} catch (error) {
				console.error(error);
			}
		}
	
		else if (userType === "designer") {
			try {
				const result = await designerFindPw(userId, username, useremail);
				console.log(result);
				setFindPwResult(result.seq);
				setExistsPwState(userType);
				// 여기서 이메일 보내기

				let confirmNumber = Math.floor(Math.random() * 900001) + 100000;

				let templateParams = {
					user_email: useremail,
					sys_code: confirmNumber,
				};
				emailjs.init("c0nz-ynLc-qYrorYn");
				emailjs.send("service_chu", "template_chu", templateParams);
				setAuthNumberResult(confirmNumber);
				
				navigate("/authnum");
			} catch (error) {
				console.error(error);
			}
		}
	
		else{
			alert("당신은 고객입니까 디자이너입니까 지윤입니까")
		}
	}
	else{
		alert("아이디와 이름, 이메일을 모두 입력해주세요!");
	}
	
  }

	return(
		<Container>
			<Wrapper>
				<Box>
					<Title>Find Password</Title>
					<Input
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          ></Input>
					<Input
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
					<Input
            type="email"
            placeholder="e-mail"
            value={useremail}
            onChange={(e) => setuseremail(e.target.value)}
          ></Input>
			<Btn type="submit" onClick={handleFindPw}>email 인증</Btn>
				</Box>
				<RadioContainer>
          <TypeLabel>
            <CustomRadio
              type="radio"
              value="customer"
              checked={userType === "customer"}
              onChange={handleUserTypeChange}
            />
            일반회원
          </TypeLabel>
          <TypeLabel>
            <CustomRadio
              type="radio"
              value="designer"
              checked={userType === "designer"}
              onChange={handleUserTypeChange}
            />
            디자이너
          </TypeLabel>
        </RadioContainer>
			</Wrapper>
		</Container>
	);
}

export default FindPw;