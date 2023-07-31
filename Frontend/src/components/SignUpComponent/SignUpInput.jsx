import { styled } from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-start;
  margin: 10px;
  flex-direction: column;
`;

const Input = styled.input`
  height: 45px;
  width: 320px;
  border: solid 1px;
  border-color: #d5d5d4;
  border-radius: 5.5px;
  padding-left: 20px;
  margin-top: 5px;
  outline: none; /* 포커스된 상태의 외곽선을 제거 */
  &:focus {
    border: 2px solid rgb(244,153,26);
    + span {
      color: rgb(244,153,26);
    }
  }
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
`;


function SignUpInput({text, placeholder }) {
  return (
    <InputWrapper>
      {/* <Text>{text}</Text> */}
      <Input placeholder={placeholder}/>
    </InputWrapper>
  )
}
export default SignUpInput;