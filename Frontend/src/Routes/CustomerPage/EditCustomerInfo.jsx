import styled from "styled-components";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getCustomerEditData, changePassword } from "../../apis";

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

const FaceWrapper = styled.div`
  
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
const FaceBox = styled.div`
  display: flex;
  justify-content: center;
`;
const FaceSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FaceImg = styled.img`
  width: 50px;
  height: 60px;
  /* background-color: red; */
  
`;

function EditCustomerInfo(){
  const BASE_URL = 'https://i9b111.q.ssafy.io/api';
  const customerSeq = localStorage.getItem('userSeq')
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery(['customerEditData', customerSeq], () => getCustomerEditData(customerSeq));
  const [selectedFaceType, setSelectedFaceType] = useState(null);
  const [selectedHairTypes, setSelectedHairTypes] = useState([]);
  const face = ['face1.png', 'face2.png', 'face3.png', 'face4.png', 'face5.png', 'noImg.png' ]
  const handleFaceClick = (seq) => {
    setSelectedFaceType(seq);
  };
  
  const handleHairClick = (seq) => {
    if (selectedHairTypes.includes(seq)) {
      setSelectedHairTypes(selectedHairTypes.filter(type => type !== seq));
    } else {
      setSelectedHairTypes([...selectedHairTypes, seq]);
    }
  };
  
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
  const password = watch("pwd");

  const onValid = async (data) => {
    try {
      const requestData = {
        "pwd": data.pwd,
        "myFace": selectedFaceType,
        "myHairCondition": selectedHairTypes
      };
      await changePassword(customerSeq, requestData);
      swal("Success", "회면정보가 수정되었습니다.", "success");
      navigate(`/customerMyPage/${customerSeq}`);
      return;
    } catch (error) {
      console.error("Sign-up error:", error);
      swal("Error", "회원정보수정 실패.", "error");
    }
  };
  useEffect(() => {
    if (data) {
        setValue("name", data.name);
        setValue("id", data.id);
        setValue("email", data.email);
        setSelectedFaceType(data.myFace);
        setSelectedHairTypes(data.myHairCondition);
      }
    }, [data, setValue]);
  console.log(selectedHairTypes, selectedFaceType);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }
  
  return(
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
            <Wrapper>
            <BackBox>
              <BackBtn src='/icon/backBtn.png' onClick={() => navigate(-1)}/>
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
                    <InputWrapper>
                      <TextBox>
                        <Text>이메일</Text>
                      </TextBox>
                      <Input placeholder="이메일" {...register("email")} readOnly />
                    </InputWrapper>
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
                            value === password ||
                            "비밀번호가 일치하지 않습니다.",
                        })}
                        />
                    </InputWrapper>
                    <ErrorMessage>{errors?.pwd1?.message}</ErrorMessage>
                  </InputBox>
                </InputWrap>
                <Hr/>
                <FaceWrapper>
                <SemiText>회원님의 얼굴 형을 선택해주세요</SemiText>
                <FaceBox>
                  {data.faceDict.map((type, index) => (
                    <FaceSet>
                      {/* <FaceImg src={`${BASE_URL}/customer-profile/face_dict/${face[{index}]}`} alt=""></FaceImg> */}
                      <FaceImg src ={`https://i9b111.q.ssafy.io/api/customer-profile/face_dict/${face[index]}`}></FaceImg>
                      {/* <img src = "https://i9b111.q.ssafy.io/api/customer-profile/face_dict/noImg.png"></img> */}
                      <FaceBtn
                        key={type.seq}
                        type="button"
                        onClick={() => handleFaceClick(type.seq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={selectedFaceType === type.seq ? "active" : "normal"}
                      >{type.faceLabel}
                      </FaceBtn>
                    </FaceSet>
                    ))}
                    </FaceBox>
                </FaceWrapper>
                <Hr/>
                <HairBox>
                <SemiText>회원님의 모발상태를 선택해주세요</SemiText>
                {data.hairConditionDict.map((type) => (
                      <HairBtn
                        key={type.seq}
                        type="button"
                        onClick={() => handleHairClick(type.seq)}
                        variants={typeBtnVariants}
                        initial="normal"
                        whileHover="hover"
                        animate={selectedHairTypes.includes(type.seq) ? "active" : "normal"}
                      >{type.label}
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