// 일반 고객 회원 정보 수정 페이지

import styled from "styled-components";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import SignUpInput from "../../components/SignUpComponent/SignUpInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  margin-top: 20px;
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
  background-color: ${(props) => (props.checked ? '#333' : 'transparent')};
  cursor: pointer;
`;

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const FaceBtn = styled(motion.button)`
  margin: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: ${props => props.active ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
  background-color: ${props => (props.active ? "rgb(100,93,81)" :"rgb(255, 255, 254)")};
  cursor: pointer;
`;
const HairBtn = styled(motion.button)`
  margin: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: ${props => props.active ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
  background-color: ${props => (props.active ? "rgb(100,93,81)" :"rgb(255, 255, 254)")};
  cursor: pointer;
`;

function EditCustomerInfo(){
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [selectedType, setSelectedType] = useState('');
  const [selectedHairType, setSelectedHairType] = useState('');
  const [faceTypes, setFaceTypes] = useState([]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFaceClick = (faceSeq) => {
    setSelectedType(faceSeq);

  };
  const handleHairClick = (faceSeq) => {
    setSelectedHairType(faceSeq);
  };

  const data = {
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


  return(
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
            <Wrapper>
              <InputWrap>
              <InputBox>
                <SignUpInput text="이름" placeholder="회원명"/>
                <SignUpInput text="아이디" placeholder="아이디"/>
                {/* <Btn>중복확인</Btn> */}
                <SignUpInput text="이메일" placeholder="이메일"/>
                {/* <Btn>중복확인</Btn> */}
                <RadioContainer>
                  <GenderLabel>
                    <CustomRadio
                      type="radio"
                      value="male"
                      checked={gender === 'male'}
                      onChange={handleGenderChange}
                    />
                    남자
                  </GenderLabel>
                  <GenderLabel>
                    <CustomRadio
                      type="radio"
                      value="female"
                      checked={gender === 'female'}
                      onChange={handleGenderChange}
                      
                    />
                    여자
                  </GenderLabel>
                </RadioContainer>
                <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호를 입력해주세요"/>
                <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />
                </InputBox>
                </InputWrap>
                <Hr/>
                <FaceBox>
                <SemiText>회원님의 얼굴 형을 선택해주세요</SemiText>
                  {data.faceType.map((faceType) => (
                      <FaceBtn
                        key={faceType.faceSeq}
                        type={faceType.faceLabel}
                        onClick={() => handleFaceClick(faceType.faceSeq)}
                        active={selectedType === faceType.faceSeq}
                      >{faceType.faceLabel}
                      </FaceBtn>
                    ))}
                              {/* {selectedType && (
                              <p>선택한 얼굴 형태: {selectedType}</p>
                              )} */}
                </FaceBox>
                <Hr/>
                <HairBox>
                <SemiText>회원님의 모발상태를 선택해주세요</SemiText>
                {data.hairCondition.map((type) => (
                      <HairBtn
                        key={type.hairSeq}
                        type={type.hairLabel}
                        onClick={() => handleHairClick(type.hairSeq)}
                        active={selectedHairType === type.hairSeq}
                      >{type.hairLabel}
                      </HairBtn>
                    ))}
                </HairBox>
                <Hr/>
                <CenterBox>
                  <SubmitBtn onClick={() => navigate('/complete')}>회원 가입하기</SubmitBtn>
                </CenterBox>  
            </Wrapper>
          </InfoBox>
        </SignupBox>
      </Container>
  );
}


export default EditCustomerInfo;