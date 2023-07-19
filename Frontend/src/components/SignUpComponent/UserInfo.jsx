import { styled } from "styled-components";
import SignUpInput from "./SignUpInput";
import { useState } from "react";

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  align-items: center;
  height: 300px;
  width: 100%;
  margin-top: 30px;
  border-radius: 20px;
  background-color: rgb(242,234,211);
  margin-bottom: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: right; */
  /* margin-left: 10%; */
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
const Btn = styled.button`
  border-radius: 0.78rem;
  border: 0;
  background-color: orange;
  height: 25px;
  width: 55px;
  font-size: 5px;
`;
const User = styled.div`
  margin-bottom: 25px;
  margin-left: 70px;
`;
const Btn1 = styled.button`
  border-radius: 0.78rem;
  border: 0;
  background-color: orange;
  height: 35px;
  width: 120px;
`;

function UserInfoComponet() {
  const [gender, setGender] = useState(""); // 선택된 성별 상태값

  const handleGenderChange = (event) => {
    setGender(event.target.value); // 선택된 성별을 상태값에 업데이트
  };
  return (
      <Container>
        <Title>회원 정보 입력</Title>
        <Wrapper>
          <Wrap>
          <SignUpInput text="이름" />
          <SignUpInput text="아이디" />
            {/* <Btn>중복확인</Btn> */}
          <SignUpInput text="이메일" />
            {/* <Btn>중복확인</Btn> */}
          </Wrap>
          <Wrap>
          <InputWrapper>
          <User>
            <Text>성별 </Text>
              <Label>
              <input
                type="radio"
                name="gender"
                value="남자"
                checked={gender === "남자"}
                onChange={handleGenderChange}
              />
              남자
            </Label>
            <Label>
              <input
                type="radio"
                name="gender"
                value="여자"
                checked={gender === "여자"}
                onChange={handleGenderChange}
              />
              여자
            </Label>
            </User>
          </InputWrapper>
          <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호 ⚠"/>
          <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />
          </Wrap>
        </Wrapper>
        <Btn1>회원 가입하기</Btn1>
      </Container>
  )
}
export default UserInfoComponet;