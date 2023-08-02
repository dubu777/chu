import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Step from '../../components/SignUpComponent/Step';
import DesignerUserInfo from "../../components/SignUpComponent/DesignerUserInfo";
import swal from "sweetalert";
import SignUpInput from "../../components/SignUpComponent/SignUpInput";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

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
  margin-top: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 15px 0;
`;

const IdText = styled.span`
  color: red;
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
  background-color: ${props => props.selected ?"rgb(100,93,81)" :"rgb(255, 255, 254)" };
  color: ${props => props.selected ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
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
  width: 60%;
  height: 35px;
`;
const Input = styled.input`
  border: 0;
  width: 260px;
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
  margin-left: 10px;
`;

function EditDesignerInfo() {
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
  const cutType = ["레이어드컷", "히메컷", "투블럭", "시스루컷", "허쉬컷", "슬릭컷", "아이비리그컷", "가일컷"]
  const permType = ["아이롱펌", "시스루펌", "C컬", "볼륨펌", "쉐도우펌", "베이비펌", "히피펌", "복구펌"]
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);
  const [data, setdata] = useState({
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
        }
    ],
    "allPermHairStyle" : [
        {
            "hairStyleSeq" : 1,
            "hairStyleLabel" : "C컬펌"
        },
        {
            "hairStyleSeq" : 2,
            "hairStyleLabel" : "히피펌"
        },
        {
            "hairStyleSeq" : 3,
            "hairStyleLabel" : "펌"
        }
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
            "hairStyleLabel" : "펌"
        }
    ]
});
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
  return (
    <Container>
      <SignupBox>
        <InfoBox>
          <Title>회원정보 수정</Title>
            <Wrapper>
              <InputWrap>
                <InputBox>
                  <SignUpInput text="이름" placeholder={data.name}/>
                  <SignUpInput text="아이디" word="*아이디 변경 불가" placeholder={data.id} disable/>
                  <SignUpInput text="이메일" placeholder={data.email}/>
                  {/* <Btn>중복확인</Btn> */}
                  <SignUpInput text="등록번호" placeholder={data.certification_num}/>
                  <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호를 입력해주세요"/>
                  <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />
                </InputBox>
              </InputWrap>
              <Hr/>
              <Box>
                <InfoText>소속 미용실(활동지역)</InfoText>
                <SearchBox>
                  <SearchImg src="./icon/search.png"/>
                  <Input placeholder={data.address} />
                </SearchBox>
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
                      cutType.map((tag) => (
                        <HashTag
                        key={tag}
                        onClick={() => toggleCutType(tag)}
                        selected={selectedCut.includes(tag)}
                        >
                          #{tag}
                        </HashTag>
                      ))
                    }
                  </SelectBox>
                  <SelectText>펌</SelectText>
                  <SelectBox>
                    {
                      permType.map((tag) => (
                        <HashTag
                          key={tag}
                          onClick={() => togglePermType(tag)}
                          selected={selectedPerm.includes(tag)}
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
                  <CancleBtn onClick={() => navigate('/designermypage')}>취소</CancleBtn>
                  <SubmitBtn onClick={() => navigate('/designermypage')}>수정 완료</SubmitBtn>
                </CenterBox>  
			      </Wrapper>
          </InfoBox>
      </SignupBox>
    </Container>
  );
}

export default EditDesignerInfo;
