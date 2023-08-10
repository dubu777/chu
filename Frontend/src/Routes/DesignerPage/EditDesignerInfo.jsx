import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Step from '../../components/SignUpComponent/Step';
import DesignerUserInfo from "../../components/SignUpComponent/DesignerUserInfo";
import swal from "sweetalert";
import SignUpInput from "../../components/SignUpComponent/SignUpInput";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
  background: #FDFDFD;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 2px 4px 30px -4px rgb(0 0 0 / 0.1);
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
  border-color: #574934;;
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

const Hr = styled.div`
	/* color: #383838; */
	border: 1px solid rgb(228, 223, 223);
	width:100%;
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
const TextBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 0 5px 8px;
`;
const Form = styled.form`
`;
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
  const navigate = useNavigate();
  const cutType = ["레이어드컷", "히메컷", "투블럭", "시스루컷", "허쉬컷", "슬릭컷", "아이비리그컷", "가일컷"]
  const permType = ["아이롱펌", "시스루펌", "C컬", "볼륨펌", "쉐도우펌", "베이비펌", "히피펌", "복구펌"]
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);
  const [result, setResult] = useState({
    "name" : "재현",
    "id" : "ssafy",
    "email" : "ssafy@ssafy.com",
    "price" : "5000",
    "certification_num" : "1234-56789",
    "salonName" : "미용실 이름",
    "latitude" : 234.2563,
    "longitude" : 234.2563,
    "address" : "대전광역시 유성구",
    "allCutHairStyle" : [
        {
          "hairStyleSeq" : 1,
          "hairStyleLabel" : "레이어드컷"
        },
        {
          "hairStyleSeq" : 2,
          "hairStyleLabel" : "웬디컷"
        },
        {
          "hairStyleSeq" : 3,
          "hairStyleLabel" : "댄디컷"
        },
        {
          "hairStyleSeq" : 4,
          "hairStyleLabel" : "히메컷"
        },
        {
          "hairStyleSeq" : 5,
          "hairStyleLabel" : "시스루컷"
        },
        {
          "hairStyleSeq" : 6,
          "hairStyleLabel" : "허쉬컷"
        },
        {
          "hairStyleSeq" : 7,
          "hairStyleLabel" : "슬릭컷"
        },
        {
          "hairStyleSeq" : 7,
          "hairStyleLabel" : "아이비리그컷"
        },
        
    ],
    "allPermHairStyle" : [
        {
          "hairStyleSeq" : 1,
          "hairStyleLabel" : "C컬펌"
        },
        {
          "hairStyleSeq" : 2,
          "hairStyleLabel" : "뽀글펌"
        },
        {
          "hairStyleSeq" : 3,
          "hairStyleLabel" : "아이롱펌"
        },
        {
          "hairStyleSeq" : 4,
          "hairStyleLabel" : "볼륨펌"
        },
        {
          "hairStyleSeq" : 5,
          "hairStyleLabel" : "베이비펌"
        },
        {
          "hairStyleSeq" : 6,
          "hairStyleLabel" : "히피펌"
        },
        {
          "hairStyleSeq" : 7,
          "hairStyleLabel" : "시스루펌"
        },
        {
          "hairStyleSeq" : 8,
          "hairStyleLabel" : "슬릭펌"
        },
    ],
    "myCutHairStyle" : [
        {
            "hairStyleSeq" : 2,
            "hairStyleLabel" : "웬디컷"
        },
        {
            "hairStyleSeq" : 3,
            "hairStyleLabel" : "댄디컷"
        }
    ],
    "myPermHairStyle" : [
        {
            "hairStyleSeq" : 3,
            "hairStyleLabel" : "히피펌"
        }
    ]
});
const allCutHairStyles = result.allCutHairStyle.map((style) => style.hairStyleLabel);
const allPermHairStyles = result.allPermHairStyle.map((style) => style.hairStyleLabel);
  const toggleCutType = (tag) => {
    if (selectedCut.includes(tag)) {
      setSelectedCut((prev) => prev.filter((resist) => resist !== tag))
    } else {
      setSelectedCut((prev) => [...prev, tag]);
    }
  };
  const togglePermType = (tag) => {
    if (selectedPerm.includes(tag)) {
      setSelectedPerm((prev) => prev.filter((resist) => resist !== tag))
    } else {
      setSelectedPerm((prev) => [...prev, tag]);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: result.name,
      id: result.id,
      email: result.email,
      certification_num: result.certification_num,
      price: result.price,
    },
  });
  const onValid = (data) => {
    // 이메일 형식 확인 및 에러 메시지 설정
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
      setError("email", { message: "올바른 이메일 형식이 아닙니다." });
      return;
    }
    // 비밀번호 조건 확인 및 에러 메시지 설정
    if (data.pwd && !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(data.pwd)) {
      setError("pwd", { message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요." });
      return;
    }
    // 비밀번호와 비밀번호 확인 일치 여부 확인 및 에러 메시지 설정
    if (data.pwd && data.pwd !== data.pwd1) {
      setError("pwd1", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    if (!/^[0-9]*$/.test(data.price)) {
      setError("price", { message: "상담 가격은 숫자만 입력 가능합니다." });
      return;
    }
    // 서버로 데이터 전송 등 필요한 작업 수행
    // ...
    console.log(data);
  };
  return (
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
            <Wrapper>
            <BackBox>
              <BackBtn src='icon/backBtn.png' onClick={() => navigate(-1)}/>
            </BackBox>
            <Form onSubmit={(e) => {
                e.preventDefault(); // 버블링 막기 위해 폼 제출을 막습니다.
                handleSubmit(onValid)(e); // 유효성 검사 후 폼 제출을 처리합니다.
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
                      <Input placeholder="이메일" {...register("email")} 
                        />
                    </InputWrapper>
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  {/* <Btn>중복확인</Btn> */}
                  <InputWrapper>
                      <TextBox>
                        <Text>등록번호</Text>
                      </TextBox>
                      <Input placeholder="등록번호" {...register("certification_num")} />
                    </InputWrapper>
                    <ErrorMessage>{errors?.certification_num?.message}</ErrorMessage>
                  <InputWrapper>
                      <TextBox>
                        <Text>비밀번호</Text>
                      </TextBox>
                      <Input
                        placeholder="8~16자리의 비밀번호를 입력해주세요"
                        type="password"
                        {...register("pwd")}
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
                        {...register("pwd1")}
                        />
                    </InputWrapper>
                    <ErrorMessage>{errors?.pwd1?.message}</ErrorMessage>
                </InputBox>
              </InputWrap>
              <Hr/>
                <Box>
                  <InfoText>상담 가격</InfoText>
                  <SearchBox>
                    <SearchImg src="./icon/money.png"/>
                    <SearchInput
                      placeholder="상담 가격"
                      {...register("price")}
                      />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </SearchBox>
                </Box>
              <Hr/>
              <Box>
                <InfoText>소속 미용실(활동지역)</InfoText>
                <SearchBox2>
                  <SearchImg src="./icon/search.png"/>
                  <SearchInput placeholder={result.address} />
                </SearchBox2>
              </Box>
              <Hr/>
              <TagWrapper>
                <StartBox>
                  <InfoText>추천 스타일</InfoText>
                </StartBox>
                <Grid>
                  <SelectText>커트</SelectText>
                  <SelectBox>
                    {
                      allCutHairStyles.map((tag) => (
                        <HashTag
                        key={tag}
                        onClick={() => toggleCutType(tag)}
                        // selected={selectedCut.includes(tag)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={selectedCut.includes(tag) ? "active" : "normal"}
                        >
                          #{tag}
                        </HashTag>
                      ))
                    }
                  </SelectBox>
                  <SelectText>펌</SelectText>
                  <SelectBox>
                    {
                      allPermHairStyles.map((tag) => (
                        <HashTag
                          key={tag}
                          onClick={() => togglePermType(tag)}
                          variants={typeBtnVariants}
                          initial="normal"
                          whileHover="hover"
                          animate={selectedPerm.includes(tag) ? "active" : "normal"}
                          >
                          #{tag}
                        </HashTag>
                      ))
                    }
                  </SelectBox>
                </Grid>
              </TagWrapper>
                <CenterBox>
                  {/* 취소할때에는 */}
                  <SubmitBtn type="submit">수정 완료</SubmitBtn>
                </CenterBox>  
                </Form>
			      </Wrapper>
          </InfoBox>
      </SignupBox>
    </Container>
  );
}

export default EditDesignerInfo;
