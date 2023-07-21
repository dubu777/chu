import { styled } from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 70%;
  height: 35px;
  border: 0;
  border-radius: 0.4rem;
  margin-left: 5px;
  padding-left: 15px;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
`;



function SignUpInput({text, placeholder }) {
  return (
    <InputWrapper>
      <Text>{text}</Text>
      <Input placeholder={placeholder}/>
    </InputWrapper>
  )
}
export default SignUpInput;