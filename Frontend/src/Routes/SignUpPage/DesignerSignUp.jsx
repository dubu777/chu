import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Step from '../../components/SignUpComponent/Step';
import DesignerUserInfo from "../../components/SignUpComponent/DesignerUserInfo";
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
  display: flex;
  flex-direction: column;
  /* align-content: center; */
  justify-content: center;
  width: 70vh;
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

const ClickBox = styled.div`
  /* flex-direction: column; */
  
`;
const Text = styled.p`
  margin-left: 30px;
  font-size: 13px;
  
`;
const Btn = styled.button`
  font-size: 15px;
  height: 35px;
  width: 150px;
  border: solid 2px;
  border-color: #9e9994;
  border-radius: 0.5rem;
  background-color: white;
  margin-top: 70px;
  margin-left: -55px;
  margin-bottom: 20px;
`;
const Profile = styled.img`
  width: 200px;
  height: 200px;
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
  margin: 5px auto;
`;
const SubmitBtn = styled.button`
  text-align: center;
  border-radius: 7px;
  background: #574934;
  color: #f1efed;
  padding: 8px 25px;
  margin-top: 30px;
  border: 0;
  font-size: 14px;
  width: 180px;
  /* font-weight: bold; */
  transition: background-color 0.3s ease;
  &:hover {
  background-color: #f0aa48;
  color: #f7f5e1;
  }
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
`;

function DesignerSignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 사진을 클릭하면 파일 선택 다이얼로그를 나타내는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일을 선택했을 때 호출되는 이벤트 핸들러
  function handleFileChange(event){
    const file = event.target.files[0];
    // 파일 타입이 image를 포함하는지 확인 후 객체 생성
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {   // 선택된 파일이 이미지 파일이 아닌 경우 alert 창 띄우기
      swal('⚠️ Image 파일 형식을 선택해주세요 :)');
    }
  };
  function Send() {
    // 선택한 파일 사용하여 필요한 작업 수행
    // 예: 파일 업로드, 서버에 데이터 전송 등
  }

  return (
  
    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" bgcolor="rgb(244,153,26)"/>
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr/>
      <SignupBox>
      <InfoBox>
      <Title>Sign Up</Title>
      <Wrapper>
      <ProfileBox>
        {/* 버튼을 클릭하면 파일 선택 다이얼로그를 나타내는 input 요소 */}
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        {/* 프로필 사진 or 연산자는 앞의 피연산자 기준*/}
         <Profile src={selectedFile || './icon/designerr.png'} alt="Profile" hasFile={selectedFile !== null} />
          <ClickBox>
            <Btn onClick={handleImageClick}>프로필 이미지 첨부</Btn>
            <Text>디자이너 프로필에 사용될 사진을 첨부해주세요</Text>
          </ClickBox>
      </ProfileBox>
      <InputBox>
      <SignUpInput text="이름" placeholder="회원명"/>
          <SignUpInput text="아이디" placeholder="아이디"/>
            {/* <Btn>중복확인</Btn> */}
          <SignUpInput text="이메일" placeholder="이메일"/>
            {/* <Btn>중복확인</Btn> */}
          <SignUpInput text="등록번호" placeholder="미용사 자격증 등록번호"/>
          <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호를 입력해주세요"/>
          <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />

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

export default DesignerSignUp;
