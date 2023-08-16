import { styled } from "styled-components";
import CustomerUserInfo from "../../components/SignUpComponent/CutomerUserInfo";
import React, { useState, useEffect, useRef } from "react";
import Step from "../../components/SignUpComponent/Step";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  signUpRequest,
  checkDuplicateId,
  checkDuplicateEmail,
} from "../../apis/auth";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useInView } from "react-intersection-observer";

const Container = styled.div`
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  width: 65vw;
  margin: 0 auto;
`;
const StepWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  margin-left: 40px;
  margin-right: 40px;
`;
const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const SignupBox = styled.div`
  display: flex;
  justify-content: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 100px;
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  /* align-content: center; */
  justify-content: center;
  width: 70vh;
  height: 100%;
  border-radius: 51px;
  background: #fdfdfd;
  /* box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.30); */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 30px -4px rgb(0 0 0 / 0.1);
`;
const Hr = styled.div`
  margin-top: 20px;
  border-bottom: 2px solid rgb(242, 234, 211);
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 180px;
  height: 180px;
`;
const ClickBox = styled.div`
  /* flex-direction: column; */
`;

const Profile = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${(props) => (props.hasFile ? "beige" : "transparent")};
  cursor: pointer;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  /* text-align: center; */
  margin: 15px auto;
`;
const SubmitBtn = styled.button`
  text-align: center;
  border-radius: 7px;
  background: #574934;
  color: #f1efed;
  padding: 10px 25px;
  margin-top: 50px;
  border: 0;
  font-size: 14px;
  width: 180px;
  /* font-weight: bold; */
  transition: background-color, 0.3s ease;
  &:hover {
    background-color: #f0aa48;
    color: #f7f5e1;
    border-color: #574934;
  }
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
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

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;
const SignUpInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 15px 0;
`;
const SignUpInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  flex-direction: column;
`;
const SignUpTextBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 0 5px 8px;
`;
const SignUpText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
const SignUpInput = styled.input`
  height: 45px;
  width: 100%;
  border: solid 1px;
  border-color: #d5d5d4;
  border-radius: 5.5px;
  padding-left: 20px;
  margin-top: 5px;
  outline: none; /* 포커스된 상태의 외곽선을 제거 */
  &:focus {
    border: 2px solid rgb(244, 153, 26);
    + span {
      color: rgb(244, 153, 26);
    }
  }
`;
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
`;
const Form = styled.form``;
const InputWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const CheckBox = styled.div`
  display: flex;
`;
const CheckBtn = styled.button`
  background-color: #574934;
  border: none;
  margin-left: 20px;
  color: white;
  border-radius: 5px;
`;
const Emailbtn = styled.button`
  width: 80px;
  height: 50px;
`;
function CustomerSignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  // 사진을 클릭하면 파일 선택 다이얼로그를 나타내는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일을 선택했을 때 호출되는 이벤트 핸들러
  function handleFileChange(event) {
    const file = event.target.files[0];
    // 파일 타입이 image를 포함하는지 확인 후 객체 생성
    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // 선택된 파일이 이미지 파일이 아닌 경우 alert 창 띄우기
      swal("⚠️ Image 파일 형식을 선택해주세요 :)");
    }
  }
  function Send() {}
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const userType = "customer";
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [userInputAuthNum, setUserInputAuthNum] = useState("");
  const [confirmNumber, setConfirmNumber] = useState(null);
  const [authEmail, setAuthEmail] = useState(false);
  const password = watch("pwd");
  const name = watch("name");
  const id = watch("id");
  const email = watch("email");
  const gender = watch("gender");
  const authNum = watch("authNum");
  const customerData = {
    name: name,
    id: id,
    email: email,
    gender: gender,
    pwd: password,
  };

  console.log(customerData);
  //아이디 중복체크
  const handleIdCheck = async () => {
    const currentId = getValues("id");
    try {
      const idCheckResult = await checkDuplicateId(currentId, userType);
      if (idCheckResult) {
        swal("Error", "이미 사용 중인 아이디입니다.", "error");
        setIsIdAvailable(idCheckResult);
        return;
      } else {
        setIsIdAvailable(idCheckResult);
        return;
      }
    } catch (error) {
      console.error("ID Check Error:", error);
      swal("Error", "아이디 중복 체크에 실패했습니다.", "error");
      return;
    }
  };
  // 이메일 중복체크
  const handleEmailCheck = async () => {
    const currentEmail = getValues("email");
    try {
      const emailCheckResult = await checkDuplicateEmail(
        currentEmail,
        userType
      );
      if (emailCheckResult) {
        swal("Error", "이미 사용 중인 이메일입니다.", "error");
        setIsEmailAvailable(emailCheckResult);
        return;
      } else {
        setIsEmailAvailable(emailCheckResult);
        return;
      }
    } catch (error) {
      console.error("Email Check Error:", error);
      swal("Error", "이메일 중복 체크에 실패했습니다.", "error");
      return;
    }
  };
  //이메일 인증
  const handleCheckEmail = async () => {
    let confirmNumber = Math.floor(Math.random() * 900001) + 100000;

    let templateParams = {
      user_email: email,
      sys_code: confirmNumber,
    };
    emailjs.init("c0nz-ynLc-qYrorYn");
    emailjs.send("service_chu", "template_chu", templateParams);
    setConfirmNumber(confirmNumber);
    swal("Success", "인증번호가 발송되었습니다.", "success");
  };

  //이메일 인증번호 확인
  const handleCheckAuthNum = () => {
    if (confirmNumber == authNum) {
      setAuthEmail(true)
      swal("Success", "인증 되었습니다..", "success");
    } else {
      swal("Error", "인증에 실패했습니다.", "error");
      setAuthEmail(false)
    }
  };
  const onSubmit = async (formData) => {
    if (isIdAvailable || isEmailAvailable) return;
    if (!authEmail) return;
    try {
      // 회원가입 API 요청
      console.log("formDATA: ", formData);
      const signUpResult = await signUpRequest(customerData, "customer");
      console.log("Sign-up success:", signUpResult);
      swal("Success", "회원가입이 완료되었습니다.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
      swal("Error", "회원가입에 실패했습니다.", "error");
    }
  };

  return (
    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" bgcolor="rgb(244,153,26)" />
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr />
      <SignupBox>
        <InfoBox>
          <Title>Sign Up</Title>
          <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ProfileBox>
                <Img src="/icon/user_gray.png" />
              </ProfileBox>
              <InputBox>
                <InputWrap>
                  <SignUpInputBox>
                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>이름</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="이름"
                        {...register("name", {
                          required: "이름을 입력해주세요.",
                        })}
                        onChange={(e) => {
                          setValue("name", e.target.value);
                          clearErrors("name");
                        }}
                      />
                    </SignUpInputWrapper>
                    {errors.name?.type === "required" && (
                      <ErrorMessage>이름을 입력해주세요.</ErrorMessage>
                    )}
                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>아이디</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="아이디"
                        {...register("id", {
                          required: "아이디를 입력해주세요.",
                        })}
                        onChange={(e) => {
                          setValue("id", e.target.value);
                          clearErrors("id");
                        }}
                        onBlur={handleIdCheck}
                      />
                    </SignUpInputWrapper>
                    {errors.id?.type === "required" && (
                      <ErrorMessage>아이디를 입력해주세요.</ErrorMessage>
                    )}
                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>이메일</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="이메일"
                        {...register("email", {
                          required: "이메일을 입력해주세요.",
                          pattern: {
                            value:
                              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "올바른 이메일 형식이 아닙니다.",
                          },
                        })}
                        onChange={(e) => {
                          setValue("email", e.target.value);
                          clearErrors("email");
                        }}
                        onBlur={handleEmailCheck}
                      />
                      <Emailbtn type="button" onClick={handleCheckEmail}>
                        이메일 인증
                      </Emailbtn>
                    </SignUpInputWrapper>
                    {errors?.email?.type === "pattern" && (
                      <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                    )}
                    {errors?.email?.type === "required" && (
                      <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
                    )}
                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>인증번호</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="인증번호를 입력해주세요"
                        {...register("authNum", {
                          required: "인증번호를 입력해주세요",
                        })}
                        onChange={(e) => {
                          setValue("authNum", e.target.value);
                          clearErrors("authNum");
                        }}
                      />
                      <Emailbtn type="button" onClick={handleCheckAuthNum}>
                        인증번호 확인
                      </Emailbtn>
                    </SignUpInputWrapper>
                    {errors.authNum?.type === "required" && (
                      <ErrorMessage>인증번호를 입력해주세요.</ErrorMessage>
                    )}
                    <RadioContainer>
                      <GenderLabel>
                        <CustomRadio
                          type="radio"
                          value="M"
                          {...register("gender")}
                          checked={watch("gender") === "M"}
                        />
                        남자
                      </GenderLabel>
                      <GenderLabel>
                        <CustomRadio
                          type="radio"
                          value="F"
                          {...register("gender")}
                          checked={watch("gender") === "F"}
                        />
                        여자
                      </GenderLabel>
                    </RadioContainer>
                    <SignUpInputWrapper>
                      {/* 여기에 다음 입력 항목이 오면 됩니다. */}
                    </SignUpInputWrapper>
                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>비밀번호</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="8~16자리의 비밀번호를 입력해주세요"
                        type="password"
                        {...register("pwd", {
                          required: "비밀번호를 입력해주세요.",
                          pattern: {
                            value:
                              /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                            message:
                              "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.",
                          },
                        })}
                      />
                      <ErrorMessage>{errors?.pwd?.message}</ErrorMessage>
                    </SignUpInputWrapper>

                    <SignUpInputWrapper>
                      <SignUpTextBox>
                        <SignUpText>비밀번호 확인</SignUpText>
                      </SignUpTextBox>
                      <SignUpInput
                        placeholder="비밀번호 확인 ✔"
                        type="password"
                        {...register("pwd1", {
                          required: "비밀번호 확인을 입력해주세요.",
                          validate: (value) =>
                            value === password ||
                            "비밀번호가 일치하지 않습니다.",
                        })}
                      />
                      <ErrorMessage>{errors?.pwd1?.message}</ErrorMessage>
                    </SignUpInputWrapper>
                  </SignUpInputBox>
                </InputWrap>
                <CenterBox>
                  <SubmitBtn type="submit">회원 가입하기</SubmitBtn>
                </CenterBox>
              </InputBox>
            </Form>
          </Wrapper>
        </InfoBox>
      </SignupBox>
    </Container>
  );
}

export default CustomerSignUp;
