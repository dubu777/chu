import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { customerlogIn, designerlogIn } from "../../apis/auth";
import { accessTokenState, loginResultState } from "../../recoil/auth";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

const Container = styled.div`
  background-image: url("./img/login.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 150px;
`;

const Wrapper = styled.div`
  border: 0;
  border-radius: 0.8rem;
  width: 35%;
  height: 50%;
  background-color: rgb(242, 234, 211, 0.5);
  color: black;
`;
const Title = styled.h1`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 30px;
`;
const Input = styled.input`
  width: 75%;
  height: 50px;
  border: 0;
  border-radius: 0.4rem;
  background-color: white;
  padding-left: 10px;
  font-size: 18px;
  margin-bottom: 20px;
`;
const P = styled.p`
  margin-top: -15px;
`;
const LogInBox = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;
const SubmitBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 12%;
  margin-right: 12%;
  margin-top: 23px;
  color: white;
`;
const Btn = styled.button`
  border: 0;
  border-radius: 0.4rem;
  font-size: 15px;
  width: 60px;
`;

const FindBox = styled.div`
  text-align: right;
  margin-right: 12%;
  margin-top: 10px;
  color: white;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 58px;
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
const Form = styled.form``;
function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const navigate = useNavigate();
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const { handleSubmit } = useForm();
  const handleLogin = async () => {
    if (!username || !password || !userType) {
      swal("Notice", "로그인 정보를 입력해주세요.", "warning");
      return;
    }
    try {
      let result;
      if (userType === "customer") {
        result = await customerlogIn(username, password);
      } else if (userType === "designer") {
        result = await designerlogIn(username, password);
      }

      // console.log("Result:", result);
      setAccessToken(result.token.accessToken);
      localStorage.setItem("userSeq", result.userSeq.toString());
      localStorage.setItem("userType", userType);
      navigate("/");
    } catch (error) {
      swal("Error", "아이디 또는 비밀번호를 확인해주세요.", "error");
      console.error(error);
    }
  };

  const onSubmit = () => {
    handleLogin();
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LogInBox>
            <Title>Log in</Title>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ID"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </LogInBox>
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
          <SubmitBox>
            <P onClick={() => navigate('/signup')}>
              Sign up
            </P>
            <P>
              <Btn type="submit" onClick={handleLogin}>
                Log in
              </Btn>
            </P>
          </SubmitBox>
          
          <FindBox onClick={() => navigate('/findid')}>
            Find id
          </FindBox>
          <FindBox onClick={() => '/findpw'}>
            Find Password
          </FindBox>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default LogIn;
