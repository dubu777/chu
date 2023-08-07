import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

	const navigate = useNavigate();
	
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
	console.log(userId,username,useremail);
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
					<Btn><Link to="/authnum">email 인증</Link></Btn>
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