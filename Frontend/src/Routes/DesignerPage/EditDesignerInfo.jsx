import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { getDesignerEditData, changeDesignerData } from "../../apis";
import { useQuery, useMutation } from "react-query";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65vw;
  /* height: 100vh; */
  margin: 50px auto;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  justify-content: center;
  width: 45vw;
  height: 100%;
  border-radius: 51px;
  background: #fdfdfd;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 30px -4px rgb(0 0 0 / 0.1);
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 15px 0;
`;

const SubmitBtn = styled.button`
  text-align: center;
  border-radius: 7px;
  background: #574934;
  color: #f1efed;
  padding: 10px 25px;
  margin: 30px 0 20px 0;
  border: 0;
  font-size: 14px;
  width: 180px;
  transition: background-color, 0.3s ease;
  &:hover {
    background-color: #f0aa48;
    color: #f7f5e1;
    border-color: #574934;
  }
`;
const CancleBtn = styled.button`
  text-align: center;
  border-radius: 7px;
  color: #574934;
  background-color: #f1efed;
  border: 2.1px solid #574934;
  padding: 10px 25px;
  margin: 30px 0 20px 0;
  font-size: 14px;
  width: 180px;
  transition: background-color, 0.3s ease;
  &:hover {
    /* background-color: #f0aa48; */
    color: #574934;
    border-color: #f0aa48;
  }
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 0px 40px;
`;
const SelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(220, 220, 220);
`;

const HashTag = styled(motion.span)`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;
const SelectText = styled.span`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  height: 79%;
  /* border-bottom: 1px solid rgb(220, 220, 220); */
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const Grid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  div:nth-child(2),
  div:nth-child(4),
  div:nth-child(6),
  div:nth-child(8) {
    grid-column: span 6;
  }
  margin-top: 20px;
  width: 100%;
  border: 1px solid rgb(148, 148, 148);
  padding: 10px 20px;
  border-radius: 10px;
`;
const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgb(191, 189, 189);
  border-radius: 10px;
  width: 30%;
  height: 35px;
  margin-right: 20px;
`;
const SearchBox2 = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgb(191, 189, 189);
  border-radius: 10px;
  width: 30%;
  height: 35px;
  margin-right: 48px;
`;
const SearchInput = styled.input`
  border: 0;
  width: 90%;
  &:focus {
    outline: none;
    border: none;
  }
`;
const SearchImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 0 10px;
`;
const InfoText = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 17px;
`;
const IntroTextArea = styled.textarea`
  border: 0;
  width: 70%;
  height: 50px;
  resize: none;
  border-radius: 5px;
  border: 1px solid rgb(191, 189, 189);
  outline: none; /* 포커스된 상태의 외곽선을 제거 */
  &:focus {
    border: 2px solid rgb(244, 153, 26);
    + span {
      color: rgb(244, 153, 26);
    }
  }
`;

const Hr = styled.div`
  /* color: #383838; */
  border: 1px solid rgb(228, 223, 223);
  width: 100%;
  margin: 20px 0;
`;
const StartBox = styled.div`
  display: flex;
  justify-content: start;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  flex-direction: column;
`;

const Input = styled.input`
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

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 0 5px 8px;
`;
const Form = styled.form``;
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
`;
const BackBtn = styled.img`
  width: 25px;
  height: 25px;
  margin: 30px 0 0 7px;
`;
const BackBox = styled.div`
  display: flex;
  justify-content: start;
`;
const typeBtnVariants = {
  normal: {},
  hover: {
    borderColor: "rgb(238, 117, 5)",
    color: "rgb(252, 156, 1)",
  },
  active: {
    borderColor: "rgb(0,0,0)",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(87, 73, 52)",
  },
};
function EditDesignerInfo() {
  const designerSeq = localStorage.getItem("userSeq");
  const { data, isError, isLoading } = useQuery(
    ["designerEditData", designerSeq],
    () => getDesignerEditData(designerSeq)
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  const watchedPassword = watch("pwd");
  const watchIntro = watch("introduction");
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);

  const handleCutClick = (seq) => {
    if (selectedCut.includes(seq)) {
      setSelectedCut(selectedCut.filter((type) => type !== seq));
    } else {
      setSelectedCut([...selectedCut, seq]);
    }
  };
  const handlePermClick = (seq) => {
    if (selectedPerm.includes(seq)) {
      setSelectedPerm(selectedPerm.filter((type) => type !== seq));
    } else {
      setSelectedPerm([...selectedPerm, seq]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const combinedHairStyles = [...selectedCut, ...selectedPerm];
      const requestData = {
        cost: formData.cost,
        pwd: watchedPassword || null,
        salonName: formData.salonName,
        introduction: watchIntro || null,
        address: formData.address,
        myHairStyleTag: combinedHairStyles,
      };
      await changeDesignerData(designerSeq, requestData);
      swal("Success", "회면정보가 수정되었습니다.", "success");
      navigate(`/designerMyPage/${designerSeq}`);
    } catch (error) {
      console.error("Sign-up error:", error);
      swal("Error", "회원정보수정 실패.", "error");
    }
  };
  useEffect(() => {
    if (data) {
      const {
        name,
        id,
        email,
        certificationNum,
        cost,
        salonName,
        address,
        introduction,
        myCutHairStyle,
        myPermHairStyle,
      } = data;
      setValue("name", name);
      setValue("id", id);
      setValue("email", email);
      setValue("certification_num", certificationNum);
      setValue("cost", cost);
      setValue("salonName", salonName);
      setValue("address", address);
      setValue("introduction", introduction);
      setSelectedCut(myCutHairStyle.hairStyleSeq);
      setSelectedPerm(myPermHairStyle.hairStyleSeq);
    }
  }, [data, setValue]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }
  console.log(data, "디자이너 정보수정 쿼리 데이터")
  console.log(selectedCut, selectedPerm, "select 데이터")

  return (
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
          <Wrapper>
            <BackBox>
              <BackBtn src="/icon/backBtn.png" onClick={() => navigate(-1)} />
            </BackBox>
            <Form
              onSubmit={(e) => {
                e.preventDefault(); // 버블링 막기 위해 폼 제출을 막습니다.
                handleSubmit(onSubmit)(e); // 유효성 검사 후 폼 제출을 처리합니다.
              }}
            >
              <InputWrap>
                <InputBox>
                  <InputWrapper>
                    <TextBox>
                      <Text>이름</Text>
                    </TextBox>
                    <Input placeholder="이름" {...register("name")} readOnly />
                  </InputWrapper>
                  <InputWrapper>
                    <TextBox>
                      <Text>아이디</Text>
                    </TextBox>
                    <Input placeholder="아이디" {...register("id")} readOnly />
                  </InputWrapper>
                  {/* 이메일 에러 메시지 출력 */}
                  <InputWrapper>
                    <TextBox>
                      <Text>이메일</Text>
                    </TextBox>
                    <Input
                      placeholder="이메일"
                      {...register("email")}
                      readOnly
                    />
                  </InputWrapper>
                  <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  {/* <Btn>중복확인</Btn> */}
                  <InputWrapper>
                    <TextBox>
                      <Text>등록번호</Text>
                    </TextBox>
                    <Input
                      placeholder="등록번호"
                      {...register("certification_num")}
                      readOnly
                    />
                  </InputWrapper>
                  <ErrorMessage>
                    {errors?.certification_num?.message}
                  </ErrorMessage>
                  <InputWrapper>
                    <TextBox>
                      <Text>비밀번호</Text>
                    </TextBox>
                    <Input
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
                  </InputWrapper>
                  <ErrorMessage>{errors?.pwd?.message}</ErrorMessage>
                  {/* 비밀번호 확인 에러 메시지 출력 */}
                  <InputWrapper>
                    <TextBox>
                      <Text>비밀번호 확인</Text>
                    </TextBox>
                    <Input
                      placeholder="비밀번호 확인 ✔"
                      type="password"
                      {...register("pwd1", {
                        required: "비밀번호 확인을 입력해주세요.",
                        validate: (value) =>
                          value === watchedPassword ||
                          "비밀번호가 일치하지 않습니다.",
                      })}
                    />
                  </InputWrapper>
                  <ErrorMessage>{errors?.pwd1?.message}</ErrorMessage>
                </InputBox>
              </InputWrap>
              <Hr />
              <Box>
                <InfoText>상담 가격</InfoText>
                <SearchBox>
                  <SearchImg src="/icon/money.png" />
                  <SearchInput
                    placeholder="상담 가격"
                    {...register("cost", {
                      required: "상담 가격을 입력해주세요.",
                      pattern: {
                        value: /^[0-9]+$/, // 숫자만 허용하는 정규 표현식
                        message: "숫자만 입력해주세요.",
                      },
                    })}
                  />
                </SearchBox>
              </Box>
              <ErrorMessage>{errors?.cost?.message}</ErrorMessage>
              <Hr />
              <Box>
                <InfoText>소속 미용실명</InfoText>
                <SearchBox2>
                  <SearchInput
                    placeholder="소속 미용실"
                    {...register("salonName", {
                      required: "소속 미용실을 입력해주세요.",
                    })}
                  />
                </SearchBox2>
              </Box>
              <ErrorMessage>{errors?.salonName?.message}</ErrorMessage>
              <Hr />
              <Box>
                <InfoText>도로명 주소</InfoText>
                <SearchBox2>
                  <SearchInput
                    placeholder="도로명 주소"
                    {...register("address", {
                      required: "도로명 주소를 입력해주세요.",
                    })}
                  />
                </SearchBox2>
              </Box>
              <ErrorMessage>{errors?.address?.message}</ErrorMessage>
              <Hr />
              <Box>
                <InfoText>한 줄 소개글</InfoText>
                  <IntroTextArea
                    placeholder="한 줄 소개"
                    {...register("introduction", {
                      required: "소개글을 작성해주세요.",
                    })}
                  />
              </Box>
                  <ErrorMessage>{errors?.introduction?.message}</ErrorMessage>
              <Hr />
              <TagWrapper>
                <StartBox>
                  <InfoText>추천 스타일</InfoText>
                </StartBox>
                <Grid>
                  <SelectText>커트</SelectText>
                  <SelectBox>
                    {data.allCutHairStyle.map((style) => (
                      <HashTag
                        key={style.hairStyleSeq}
                        onClick={() => handleCutClick(style.hairStyleSeq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={
                          selectedCut.includes(style.hairStyleSeq)
                            ? "active"
                            : "normal"
                        }
                      >
                        #{style.hairStyleLabel}
                      </HashTag>
                    ))}
                  </SelectBox>
                  <SelectText>펌</SelectText>
                  <SelectBox>
                    {data.allPermHairStyle.map((style) => (
                      <HashTag
                        key={style.hairStyleSeq}
                        onClick={() => handlePermClick(style.hairStyleSeq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={
                          selectedPerm.includes(style.hairStyleSeq)
                            ? "active"
                            : "normal"
                        }
                      >
                        #{style.hairStyleLabel}
                      </HashTag>
                    ))}
                  </SelectBox>
                </Grid>
              </TagWrapper>
              <CenterBox>
                {/* 취소할때에는 */}
                <SubmitBtn type="submit">수정하기</SubmitBtn>
              </CenterBox>
            </Form>
          </Wrapper>
        </InfoBox>
      </SignupBox>
    </Container>
  );
}

export default EditDesignerInfo;
