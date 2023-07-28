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
  margin-bottom: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  width: 900px;
  margin-top: 50px;
  border-radius: 20px;
  background-color: rgb(242,234,211);
  margin-bottom: 20px;
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06); */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
`;


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const User = styled.div`
  display: flex; /* 추가: 라디오 버튼과 텍스트를 가로로 나열하기 위해 */
  align-items: center; /* 추가: 라디오 버튼과 텍스트를 수직 중앙에 정렬 */
  margin-bottom: 25px;
  margin-left: 70px;
`;
const SubmitBtn = styled.button`
  background-color: rgba(244,153,26,0.6);
  color: black;
  padding: 10px 55px;
  border: 0;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: rgba(244,153,26,1);
  color: #f7f5e1;
  }
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
          <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호 ⚠"/>
          <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />
          </Wrap>
        </Wrapper>
        <SubmitBtn>회원 가입하기</SubmitBtn>
      </Container>
  )
}
export default UserInfoComponet;