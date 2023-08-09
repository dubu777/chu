// 여기는 고객 마이페이지
import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
// import CustomerPageInfo from "../../components/CustomerComponent/CustomerPageInfo";
import ScheduleListImg from "../../components/CustomerComponent/ScheduleListImg";
import ReserveList from "../../components/CustomerComponent/ReserveList";
import LikeDesigner from "../../components/CustomerComponent/LikeDesigner";
// import ProfileImg from "../../components/CustomerComponent/ProfileImg";
import { Link, useParams } from "react-router-dom";
import {formDataState} from "../../recoil";
import {attachCustomerImage, getCustomerMyPage} from "../../apis";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { BASE_URL } from '../../apis/rootUrl';

const Container = styled.div`

`;
const InfoContainer = styled.div`
  font-family: "Blue-road";
`;
// 고정 프로필바
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
	width: 100%;
	height: 270px;
	background-color: #f8f1d9;
    
`;
const ImgBox = styled.div`
  text-align: center;
  margin-top: 110px;
`;

const NameText = styled.h1`
  font-size: 25px;
  font-weight: bold;
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
  margin-top: 10px;
  margin-right: 10px;
  padding: 2px 15px;
`;
const InfoBox = styled.div`
  width: 30%;
  margin-top: 190px;
  margin-left: -120px;
`;
const ChangeBox = styled.div`
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
  margin: 160px auto 50px auto;
  height: 150px;
  width: 60%;
  border-radius: 0.7rem;
`;

const Wrapper = styled.div`
  width: 60%; 
  margin: 30px auto 10px auto;
`;

const TextBox = styled.div`
  
`;

const Box = styled.div`
  height: 500px;
  border: 0;
  border-top-right-radius: 15px;
  background-color: #F9F5F0;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 15px;
  border-bottom-color: white;
  border: 2px solid white;
  background-color: ${({ isActive }) => (isActive ? '#F9F5F0' : '#F2EAD3')};
  border-left-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-top-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-right-color: ${({ isActive }) => (isActive ? '#645D51' : '#F2EAD3')};
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`
const Profile = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${props => props.hasFile ? 'lightblue' : 'transparent'};
  cursor: pointer;
`;

function CustomerMyPage(){

  // 통신되면 열기
  const { customerSeq } = useParams();
  // const customerSeq = 6;
  console.log("커스터머 시퀀스",customerSeq);
  const { data, isLoading, isError } = useQuery(
    ["customerMyPage", customerSeq],
    () => getCustomerMyPage(customerSeq)
  );

  
  // const [data, setdata] = useState({
  //   "customerSeq" : 1,
  //       "name" : "김싸피",
  //       "id" : "ssafy",
  //       "email" : "ssafy@gmail.com",
  //       "img" : "img1.png",
  //       "hairCondition" : [
  //           "얇은 모발",
  //           "굵은 모발"
  //       ],
  //       "face" : "계란형",
  //       "futureConsulting" : [
  //           {
  //               "consultingSeq" : 10,
  //               "designerImg" : "img1.png",
  //               "reviewScore" : 4.7,
  //               "name" : "지윤",
  //               "consultingDate" : "08.21",
  //               "consultingDateDay" : "금",
  //               "consultingStartTime" : "18:30",
  //               "url" : " ",
  //           },
  //           {
  //               "consultingSeq" : 11,
  //               "designerImg" : "img2.png",
  //               "reviewScore" : 4.8,
  //               "name" : "민지",
  //               "consultingDate" : "08.22",
  //               "consultingDateDay" : "금",
  //               "consultingStartTime" : "18:30",
  //               "url" : " ",
  //           }
        
  //       ],
  //       "pastConsuting" : [
  //           {
  //               "consultingSeq" : 8,
  //               "designerImg" : "img1.png",
  //               "allReviewScore" : 4.7,
  //               "name" : "지윤",
  //               "consultingDate" : "05.21",
  //               "consultingDateDay" : "금",
  //               "consultingStartTime" : "18:30",
  //               "consultingEndTime" : "17:00",
  //               "myReviewScore" : 4.9,
  //               "reviewContent" : "옛날에 남긴 나의 한줄평",
  //           },
  //           {
  //               "consultingSeq" : 9,
  //               "designerImg" : "img1.png",
  //               "allReviewScore" : 4.7,
  //               "name" : "민지",
  //               "consultingDate" : "06.21",
  //               "consultingDateDay" : "금",
  //               "consultingStartTime" : "18:30",
  //               "consultingEndTime" : "17:00",
  //               "myReviewScore" : 4.9,
  //               "reviewContent" : "옛날에 남긴 나의 한줄평",
  //           },
  //       ]
  // });
  const [activeBtn, setActiveBtn] = useState('recent'); // 'recent' or 'designer'
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file,setFile] = useState()
  // const [recodilFormData, setrecodilFormData] = useRecoilState(formDataState);
  // 사진을 클릭하면 파일 선택 다이얼로그를 나타내는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  }
  // 파일을 선택했을 때 호출되는 이벤트 핸들러
  // onChange
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

  //통신 되면 열기
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }

    // const file = event.target.files[0];
    // // 파일 타입이 image를 포함하는지 확인 후 객체 생성
    // if (file && file.type.includes('image')) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setSelectedFile(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // } else {   // 선택된 파일이 이미지 파일이 아닌 경우 alert 창 띄우기
    //   swal('⚠️ Image 파일 형식을 선택해주세요 :)');
    // }
    // };

  // const handleSubmitImage = async () => {
  //   if (selectedFile) {
  //     const formData = new FormData();  // 폼 데이터 생성 
  //     // formData.append("img", fileInputRef.current.files[0]);
  //     formData.append("img", selectedFile);
  //     console.log("선택된 파일 접근")
  //   try {
  //     const response = await attachImage(customerSeq, formData);
  //     console.log(response);
      
  //   } catch(error){
  //     console.log(error);
  //     }
  //   }
  // };

  const handleSubmitImage = async(e) => {
    e.preventDefault();
    if (fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append('img', fileInputRef.current.files[0]);
      for (const keyValue of formData) console.log(keyValue);

      try {
        const file = await attachCustomerImage(customerSeq, formData);
        console.log(file)
      } catch(error){
        console.log(error)
      }}
    };
    //   try {
    //     const response = await axios.patch(`http://localhost:9090/api/customer/detail/img/${customerSeq}`, formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data' // 필요한 경우 헤더 설정
    //       },
    //     });
    //     console.log(response);
    //     // API 호출 결과 처리
    //   } catch (error) {
    //     console.log(error);
    //     // 에러 처리
    //   }
    // }
  


  const handleBtnClick = (btnType) => {
    setActiveBtn(btnType);
  };
  return(
    <Container>
        {/* <CustomerPageInfo /> */}
        <InfoContainer>
          <InfoWrapper>
            <ImgBox>
              <NameText>{data.name}</NameText>
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
                  // src={selectedFile || './icon/profile2.png'} 
                  src={selectedFile || `${BASE_URL}/customer-profile/${data.img}`}
                  alt="Profile" 
                  hasFile={selectedFile !== null} 
                />
                {/* 이미지 제출 버튼 */}
                  <button onClick={handleSubmitImage}>사진 제출</button>
              </div>
            </ImgBox>
            <InfoBox>
              <Text>{data.id}</Text>
              <Text>{data.email}</Text>
              {data.hairCondition.map((word, index) => (
            <HashTag key={index}> #{word} </HashTag>
            ))}
            </InfoBox>

            <ChangeBox>
              <ChangeBtn><Link to="/editcustomerinfo">회원 정보 변경</Link></ChangeBtn>
            </ChangeBox>
          </InfoWrapper>
        </InfoContainer>
      {/* 예약 정보 확인하기 */}
        <ReserveWrapper>
          <ImgBox>
            <ScheduleListImg />
          </ImgBox>
          <TextBox>
          </TextBox>
          <InfoBox>
          </InfoBox>
        </ReserveWrapper>

{/* 여기는 탭 작동 */}
        <Wrapper>
          <ClickBtn 
            isActive={activeBtn === 'recent'} 
            onClick={() => handleBtnClick('recent')}
            >최근 상담 내역
          </ClickBtn>
          <ClickBtn 
            isActive={activeBtn === 'designer'} 
            onClick={() => handleBtnClick('designer')}
            >좋아요 한 디자이너
          </ClickBtn>
          <Box>
            {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
            {activeBtn === 'recent' && <ReserveList />}
            {activeBtn === 'designer' && <LikeDesigner />}
          </Box>
        </Wrapper>
    </Container>
    )
}
export default CustomerMyPage;