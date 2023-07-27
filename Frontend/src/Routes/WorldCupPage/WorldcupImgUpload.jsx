// 스타일 월드컵은 어때요? 눌렀을 때 뜨는 파일 업로드 페이지
// https://cookinghoil.tistory.com/122

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
	font-family: "Blue-road";        
`;
const Title = styled.h1`
	margin-bottom: 50px;
	margin-top: 50px;
	font-size: 20px;
`;

const Text = styled.p`
	margin-top: 10px;
`;
const Wrapper = styled.div`

`;

const Imgbox = styled.div`
`;

const Borderbox = styled.div`
	border: dashed 2px;
	border-color: #988b60;
	margin: 10px 20px;
	border-radius: 0.5rem;
`;

const Box = styled.div`
  width: 40%;
	height: 350px;
	background-color: #f7f6e6;
	margin: auto;
	border-radius: 0.6rem;
`;
const Input = styled.input`
	font-family: "Blue-road";
	margin: 15px;
`;

const DefaultImg = styled.img`
	width: 50px;
	height: 50px;
	margin-top: 20%;
	margin-bottom: 10px;
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
	height: 30px;
	width: 180px;
	border-radius: 0.4rem;
	background-color: #f6be4e;
	margin: 20px 10px;
	cursor: pointer;
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

function WorldcupImgUpload() {
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

  // 파일 삭제 및 초기화 버튼을 누를때 호출되는 함수
  const handleFileRemoveButton = () => {
    // 파일 선택을 초기화합니다.
    document.getElementById('file').value = '';
    setFile(null);
    setFilePreview(null);
		setFileName('');
  };

  return (
    <Container>
        <Title>File Upload</Title>
				<Box>
        {filePreview ? ( // 파일 미리보기가 있을 경우에만 보여주기
        	<Imgbox>
						<br />
          	<Text>이미지 미리보기</Text>
						<Borderbox>
							<br />
          		<Img src={filePreview} alt="Preview"/>
							<Div>
								<P>{fileName}</P>
								<DeleteBtn onClick={handleFileRemoveButton}>삭제</DeleteBtn>
							</Div>
						</Borderbox>
        	</Imgbox>
				
				) : (
					/* 파일 이미지가 없을 때 */
					<Imgbox>
						<DefaultImg src="/img/file.png"></DefaultImg>
						<Text>Style worldcup에 사용할 사진을 업로드 해주세요 :)</Text>
					</Imgbox>
						
					
      	)}
				</Box>
        <Imgbox>
          <Input type="file" id="file" onChange={handleChangeFile} multiple="multiple"></Input>
        </Imgbox>
        <div>
          <Btn onClick={() => Send()}>사진 업로드</Btn>
        </div>
    </Container>
  );
}

export default WorldcupImgUpload;
