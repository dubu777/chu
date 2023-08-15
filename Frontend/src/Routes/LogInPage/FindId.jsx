import { Link, useNavigate } from "react-router-dom";
import { setFindId, setExistState } from "../../recoil/auth";
import { useRecoilState } from "recoil";
import { customerFindId, designerFindId } from "../../apis/auth";
import React, { useState } from "react"; 
import styled from "styled-components";

const Container = styled.div`
  background: url("./img/findid.jpg");
  filter: invert(5%);
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
  width: 70%;
  height: 40px;
  margin-top: 30px;
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
function FindId() {
  const [username, setUsername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userType, setUserType] = useState("");
  const [findIdResult, setFindIdResult] = useRecoilState(setFindId);
  const [existState, setExistsState] = useRecoilState(setExistState);

  const navigate = useNavigate();
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFindId = async () => {

    if(username != null && useremail != null) {
      if (userType === "customer") {
        try {
          const result = await customerFindId(username, useremail);
          console.log(result);
          setFindIdResult(result.id);
          setExistsState(result.exists);
          navigate("/foundid");
        } catch (error) {
          console.error(error);
        }
      }
  
      else if (userType === "designer") {
        try {
          const result = await designerFindId(username, useremail);
          console.log(result);
          setFindIdResult(result.id);
          setExistsState(result.exists);
          navigate("/foundid");
        } catch (error) {
          console.error(error);
        }
      }

      else{
        alert("당신은 고객입니까 디자이너입니까 민지입니까")
      }
    }
    else{
      alert("아이디와 이메일을 모두 입력해주세요!");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Box>
          <Title>Find ID</Title>
          <br></br>
          <Input
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <br></br>
          <Input
            type="email"
            placeholder="e-mail"
            value={useremail}
            onChange={(e) => setuseremail(e.target.value)}
          ></Input>
          <Btn type="submit" onClick={handleFindId}>
            확인
          </Btn>
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

export default FindId;
