import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Step from '../../components/SignUpComponent/Step';
import DesignerUserInfo from "../../components/SignUpComponent/DesignerUserInfo";

const Container = styled.div`
  text-align: center;
	
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
`;

const Text = styled.p`
	margin-top: 10px;
  font-size: 14px;
  margin-left: 15px;
`;
const Box = styled.div`
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
`;
const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 15px;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 200px;
  background-color: rgb(100,93,81);
  border-radius: 10px;
`;

const Borderbox = styled.div`
	border: dashed 2px;
	border-color: #988b60;
	margin: 10px 20px;
	border-radius: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
	font-family: "Blue-road";
	margin: 15px;
`;

const DefaultImg = styled.img`
	width: 100px;
	height: 100px;
`;

const Img = styled.img`
    width: 200px;
    height: 200px;
`;
const DeleteBtn = styled.button`
	border: 0;
	height: 20px;
	width: 40px;
	border-radius: 0.8rem;
	background-color: #f6be4e;
	font-size: 10px;
`;
const Btn = styled.button`
	border: 0;
  font-weight: bold;
	height: 30px;
	width: 180px;
	border-radius: 0.4rem;
	background-color: rgba(244,153,26,0.7);
	margin: 20px 10px;
	cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: rgba(244,153,26,1);
  color: #f7f5e1;
  }
`;
const Div = styled.div`
	/* width: 300px; */
	display: flex;
	justify-content: right;
	margin-right: 10px;
`;

const P = styled.p`
	text-align: right;
	margin-right: 10px;
	margin-bottom: 5px;
`;
const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
function DesignerSignUp() {
  const [file, setFile] = useState(null); // 파일
  const [filePreview, setFilePreview] = useState(null); // 파일 미리보기를 위한 URL
	const [fileName, setFileName] = useState(''); // 파일 이름

  const handleChangeFile = (event) => {
    // 선택한 파일 정보 가져오기
    const selectedFile = event.target.files[0];

    // 파일 미리보기를 위한 URL 생성
    const filePreviewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(filePreviewUrl);

    // 선택한 파일 설정
    setFile(selectedFile);
		setFileName(selectedFile.name); // 파일 이름 설정
  };

  function Send() {
    // 선택한 파일 사용하여 필요한 작업 수행
    // 예: 파일 업로드, 서버에 데이터 전송 등
  }

  // 파일 삭제 및 초기화 버튼을 누를 때 호출되는 함수
  const handleFileRemoveButton = () => {
    // 파일 선택을 초기화합니다.
    document.getElementById('file').value = '';
    setFile(null);
    setFilePreview(null);
		setFileName('');
  };

  return (
    <Container>
      <StepWrapper>
        <Step top="step1" bottom="회원 유형 선택" />
        <Step top="step2" bottom="약관 동의" />
        <Step top="step3" bottom="회원 정보 입력" bgcolor="rgb(244,153,26)"/>
        <Step top="step4" bottom="가입 완료" />
      </StepWrapper>
      <Hr/>
      <Title>회원 정보 입력</Title>
      <Wrapper>
      {filePreview ? ( // 파일 미리보기가 있을 경우에만 보여주기
        <Box>
          <Text>이미지 미리보기</Text>
          <Borderbox>
            <Img src={filePreview} alt="Preview"/>
            <Div>
              <P>{fileName}</P>
              <DeleteBtn onClick={handleFileRemoveButton}>삭제</DeleteBtn>
            </Div>	
          </Borderbox>
          <Btn onClick={() => Send()}>사진 업로드</Btn>
        </Box>
				
				) : (
					/* 파일 이미지가 없을 때 */
        <ProfileBox>
          <ImgBox>
            <DefaultImg src="/icon/profileicon.png"></DefaultImg>
          </ImgBox>
          <FileBox>
            <Box>
              <Input type="file" id="file" onChange={handleChangeFile} multiple="multiple"></Input>
            </Box>
            <Text>디자이너 프로필에 사용될 사진을 첨부해주세요</Text>
            <Btn onClick={() => Send()}>사진 업로드</Btn>
          </FileBox>
        </ProfileBox>			
        )}
			</Wrapper>
      <DesignerUserInfo/>
    </Container>
  );
}

export default DesignerSignUp;
