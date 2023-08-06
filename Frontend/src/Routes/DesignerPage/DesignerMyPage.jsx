// 여기는 디자이너 마이페이지
import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
import ProfileImg from "../../components/CustomerComponent/ProfileImg";
import axios from 'axios';
import ReserveCalendar from "../../components/DesignerComponent/ReserveCalendar";
import AllReserveList from "../../components/DesignerComponent/AllReserveList";
import Portfolio from "../../components/DesignerComponent/Portfolio";
import { useNavigate } from "react-router";
import {attachDesignerImage} from "../../apis/designer";

const Container = styled.div`

`;

// 고정 프로필바
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-around;
	width: 100%;
	height: 270px;
	background-color: #f8f1d9;
  /* font-family: "Blue-road"; */
  /* font-family: "Apple-B";   */
    
`;
const ImgBox = styled.div`
  text-align: center;
  margin-top: 110px;
`;

const NameText = styled.h1`
  font-size: 25px;
  /* font-weight: bold; */
`;
const Text = styled.p`
  margin-bottom: 20px;
  font-size: large;
`;
const HashTag = styled.button`
  border: 0;
  border-radius: 0.3rem;
  background-color: #78756c;
  color: white;
  height: 30px;
  margin-right: 10px;
  padding: 2px 15px;
`
const InfoBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 155px;
  margin-left: -120px;
`;
const ChangeBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 220px;
  text-align: right;
`;

const ChangeBtn = styled.button`
  border: 0;
  border-radius: 0.4rem;
  background-color: #f9bd4f;
  width: 150px;
  height: 35px;
  
`;
const ReserveWrapper = styled.div`
  border: solid 2px;
  border-color: gray;
  margin: 200px auto 50px auto;
  height: 150px;
  width: 60%;
  border-radius: 0.7rem;
`;

const Wrapper = styled.div`
  width: 60%; 
  /* hesight: 500px; */
  margin: 170px auto 10px auto;
  
`;

const TextBox = styled.div`
  
`;

const Box = styled.div`
  min-height: 500px;
  height: 75%;
  border: 0;
  background-color: #F9F5F0;
  padding-bottom: 20px;
  margin-bottom: 60px;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 25px;
  border-bottom-color: white;
  border: 2px solid white;
  background-color: ${({ isActive }) => (isActive ? '#F9F5F0' : '#F2EAD3')};
  border-left-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-top-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-right-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-bottom: white;
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`
const EditBox = styled.div`
  margin-bottom: 25px;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const TextArea = styled.div`
  border: none;
  width: 400px;
  height: 40px;
  /* padding: 0px 15px; */
  border-radius: 0.3rem;
  margin-bottom: 7px;
  background-color: white;
  resize: none;
`;
const EditBtn =styled.button`
  height: 25px;
  border: 2px solid orange;
  background-color: beige;
  border-radius: 0.7rem;
  margin-left: 10px;
`;
const Profile = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${props => props.hasFile ? 'lightblue' : 'transparent'};
  cursor: pointer;
`;

function DesignerMyPage(){
  const navigate = useNavigate();
  const [data, setData] = useState({
    "name" : "재현",
        "cost" : "5000",
        "email" : "ssafy@ssafy.com",
        "introduction" : " 남자 펌 전문 !",
        "img" : "img1.png",
        "hairStyleTag" : [
            "시스루펌",
            "아이롱펌",
            "레이어드"
        ],
        // 본인이 오늘 상담 가능하다고 선택했던 시간들
        "selectTime" : [
            "10:00",
            "10:30",
            "14:00"
        ]
  });
  const [activeBtn, setActiveBtn] = useState('calendar'); // 'recent' or 'designer'
  const [introduction, setIntroduction] = useState(data.introduction || ""); // data.introduction의 값이 없으면 빈 문자열로 초기화
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 체크
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [file,setFile] = useState()
  const handleImageClick = () => {
    fileInputRef.current.click();
  }
  const handleFileChange=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      formData.append('img',uploadFile)
      console.log(formData)
      setFile(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  };
  const handleSubmitImage = async(e) => {
    e.preventDefault();
    const seq =2;
    if (fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append('img', fileInputRef.current.files[0]);
      for (const keyValue of formData) console.log(keyValue);

      try {
        const file = await attachDesignerImage(seq, formData);
        console.log(file)
      } catch(error){
        console.log(error)
      }}
    };
  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.innerText);
  }
  const handleEditButtonClick = () => {
    setIsEditing(true);
  }
  const handleSaveButtonClick = () => {
    setData({...data, introduction});
    setIsEditing(false);
  };
  // 누른 버튼에 따라 
  const handleBtnClick = async (btnType) => {
    setActiveBtn(btnType);
  };


  return(
    <Container>
     <ProfileWrapper>
        <ImgBox>
          <NameText>{data.name}디자이너</NameText>
          <div>
                {/* 버튼을 클릭하면 파일 선택 다이얼로그를 나타내는 input 요소 */}
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  ref={fileInputRef} 
                  onChange={handleFileChange} />

                {/* 프로필 사진 or 연산자는 앞의 피연산자 기준*/}
                <Profile 
                  onClick={handleImageClick} 
                  src={selectedFile || './icon/profile2.png'} 
                  alt="Profile" 
                  hasFile={selectedFile !== null} 
                />
                {/* 이미지 제출 버튼 */}
                  <button onClick={handleSubmitImage}>사진 제출</button>
              </div>
        </ImgBox>
        
        <InfoBox>
          <Text>{data.cost}</Text>
          <Text>{data.email}</Text>
          <Text>{data.introduction}</Text>
          {data.hairStyleTag.map((word, index) => (
            <HashTag key={index}> #{word} </HashTag>
          ))}
        </InfoBox>

        <ChangeBox>
          <ChangeBtn onClick={() => navigate("/editdesignerinfo")}>회원 정보 변경</ChangeBtn>
        </ChangeBox>
      </ProfileWrapper>
        


{/* 여기는 탭 작동 */}
        <Wrapper>
          <ClickBtn 
            isActive={activeBtn === 'calendar'} 
            onClick={() => handleBtnClick('calendar')}
            >상담 캘린더
          </ClickBtn>
          <ClickBtn 
            isActive={activeBtn === 'reserve'} 
            onClick={() => handleBtnClick('reserve')}
            >예약 관리
          </ClickBtn>
          <ClickBtn 
            isActive={activeBtn === 'pofol'} 
            onClick={() => handleBtnClick('pofol')}
            >포트폴리오
          </ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {activeBtn === 'calendar' && <ReserveCalendar />}
            {activeBtn === 'reserve' && <AllReserveList />}
            {activeBtn === 'pofol' && <Portfolio />}
          </Box>
        </Wrapper>
    </Container>
    )
}


export default DesignerMyPage;