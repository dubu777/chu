// 일반 고객 회원 정보 수정 페이지

import styled from "styled-components";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import SignUpInput from "../../components/SignUpComponent/SignUpInput";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  width: 65vw;
  margin: 0 auto;    
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 100px;
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
  width: 65vw;
  height: 800px;
  border-radius: 51px;
  background: #FDFDFD;
  /* box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.30); */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 2px 4px 30px -4px rgb(0 0 0 / 0.1);
`;
const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 20px; */
`;
const Img = styled.img`
  border-radius: 50%;
  width: 180px;
  height: 180px;
`;
const ClickBox = styled.div`
  /* flex-direction: column; */
  
`;
const Text = styled.p`
  margin-left: 30px;
  font-size: 10px;
`;

const Profile = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${props => props.hasFile ? 'beige' : 'transparent'};
  cursor: pointer;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-color: #574934;;
  }
`;
const SemiText = styled.p`
  font-size: 18px;
`;

const FaceBox = styled.div`
  
`;
const HairBox = styled.div`
  
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
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

const FaceBtn = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.active ? 'orange' : 'beige')};
  cursor: pointer;
`;

function EditCustomerInfo(){
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [selectedType, setSelectedType] = useState('');
  const [faceTypes, setFaceTypes] = useState([]);


  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const Button = ({ label, onClick, active }) => {
    const handleClick = () => {
      onClick();
    };
  
    return (
      <Button active={active} onClick={handleClick}>
        {label}
      </Button>
    );
  };
  const handleButtonClick = (faceSeq) => {
    setSelectedType(faceSeq);
    // 여기에서 선택한 타입을 백엔드로 보내는 로직을 추가
    sendSelectedTypeToBackend(faceSeq);
  };
  const sendSelectedTypeToBackend = async (faceSeq) => {
    try {
      // 여기에서 서버 URL 수정
      const url = 'http://example-backend.com/api/save-face-type';
      const data = { selectedType: faceSeq };
      // axios 등을 사용해서 나중에 백엔드로 데이터 전송
      console.log('선택한 얼굴 형태를 백엔드로 전송했습니다.');
    } catch (error) {
      console.error('전송 중 오류가 발생했습니다:', error);
    }
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
          <Title>Update Information</Title>
            <Wrapper>
              <ProfileBox>
                <Img src="/icon/user_gray.png" />
              </ProfileBox>
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
                <FaceBox>
                <SemiText>회원님의 얼굴 형을 선택해주세요</SemiText>
                {data.faceType.map((faceType) => (
          <FaceBtn
            key={faceType.faceSeq}
            type={faceType.faceLabel}
            onClick={() => handleButtonClick(faceType.faceSeq)}
            active={selectedType === faceType.faceSeq}
          >{faceType.faceLabel}
          </FaceBtn>
        ))}
                  {/* {selectedType && (
                  <p>선택한 얼굴 형태: {selectedType}</p>
                  )} */}
                </FaceBox>
                <HairBox>

                </HairBox>
              <CenterBox>
                <SubmitBtn onClick={() => navigate('/complete')}>회원 가입하기</SubmitBtn>
              </CenterBox>  
              </InputBox>
			      </Wrapper>
          </InfoBox>
      </SignupBox>
      </Container>
  );
}


export default EditCustomerInfo;