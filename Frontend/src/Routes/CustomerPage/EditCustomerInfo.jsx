import styled from "styled-components";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import SignUpInput from "../../components/SignUpComponent/SignUpInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65vw;
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
const Hr = styled.div`
	border: 1px solid rgb(228, 223, 223);
	width:100%;
	margin: 20px 0;
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
  background: rgb(87, 73, 52);
  color: #f1efed;
  padding: 10px 25px;
  margin-top: 20px;
  border: 0;
  font-size: 14px;
  width: 180px;
  /* font-weight: bold; */
  transition: background-color, 0.3s ease;
  &:hover {
  background-color: #f0aa48;
  color: #f7f5e1;
  border-color: #574934;;
  }
`;
const SemiText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const FaceBox = styled.div`
  
`;
const HairBox = styled.div`
  
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const FaceBtn = styled(motion.button)`
  margin: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;
const HairBtn = styled(motion.button)`
  margin: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
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
    borderColor: "orange",
    color: "orange",
  },
  active: {
    borderColor: "black",
    color: "white",
    backgroundColor: "rgb(87, 73, 52)",
  },
};
function EditCustomerInfo(){
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [selectedFaceType, setSelectedFaceType] = useState('');
  const [selectedHairType, setSelectedHairType] = useState('');
  const [faceTypes, setFaceTypes] = useState([]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFaceClick = (faceSeq) => {
    setSelectedFaceType(faceSeq);

  };
  const handleHairClick = (faceSeq) => {
    setSelectedHairType(faceSeq);
  };
  const result = {
    "name": "김싸피",
    "id": "ssafy",
    "email": "ssafy@ssafy.com",
    "gender": "F",
    "faceType": [
      {
        "faceSeq": 0,
        "faceLabel": "선택안함",
        "faceImg": "img0.png"
      },
      {
        "faceSeq": 1,
        "faceLabel": "역삼각형",
        "faceImg": "img1.png"
      },
      {
        "faceSeq": 2,
        "faceLabel": "계란형",
        "faceImg": "img2.png"
      },
      {
        "faceSeq": 3,
        "faceLabel": "긴 얼굴형",
        "faceImg": "img3.png"
      },
      {
        "faceSeq": 4,
        "faceLabel": "둥근형",
        "faceImg": "img4.png"
      }
    ],
    "myFace": "2",
    "hairCondition": [
      {
        "hairSeq": 0,
        "hairLabel": "선택 안함"
      },
      {
        "hairSeq": 1,
        "hairLabel": "굵은 모발"
      },
      {
        "hairSeq": 2,
        "hairLabel": "얇은 모발"
      },
      {
        "hairSeq": 3,
        "hairLabel": "윤기 없음"
      }
    ],
    "myHairCondition": [
      2, 3, 4
    ]
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
    // 서버로 데이터 전송 등 필요한 작업 수행
    // ...
    console.log(data);
  };

  return(
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
            <Wrapper>
            <BackBox>
              <BackBtn src='icon/backBtn.png' onClick={() => navigate(-1)}/>
            </BackBox>
              <Form onSubmit={handleSubmit(onValid)}>
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
                      <Input placeholder="이메일" {...register("email")} />
                    </InputWrapper>
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                    {/* 비밀번호 에러 메시지 출력 */}
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
                <FaceBox>
                <SemiText>회원님의 얼굴 형을 선택해주세요</SemiText>
                  {result.faceType.map((type) => (
                      <FaceBtn
                        key={type.faceSeq}
                        type={type.faceLabel}
                        onClick={() => handleFaceClick(type.faceSeq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={selectedFaceType === type.faceSeq ? "active" : "normal"}
                      >{type.faceLabel}
                      </FaceBtn>
                    ))}
                </FaceBox>
                <Hr/>
                <HairBox>
                <SemiText>회원님의 모발상태를 선택해주세요</SemiText>
                {result.hairCondition.map((type) => (
                      <HairBtn
                        key={type.hairSeq}
                        type={type.hairLabel}
                        onClick={() => handleHairClick(type.hairSeq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={selectedHairType === type.hairSeq ? "active" : "normal"}
                      >{type.hairLabel}
                      </HairBtn>
                    ))}
                </HairBox>
                <Hr/>
                <CenterBox>
                  <SubmitBtn 
                    type="submit"
                  >수정하기
                  </SubmitBtn>
                </CenterBox>
                </Form>  
            </Wrapper>
          </InfoBox>
        </SignupBox>
      </Container>
  );
}


export default EditCustomerInfo;