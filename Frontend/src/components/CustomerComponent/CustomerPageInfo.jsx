// // 여기는 고객 마이페이지
// import styled from "styled-components";
// import React, {useState, useEffect} from "react";
// import ProfileImg from "../../components/CustomerComponent/ProfileImg";
// import { Link } from "react-router-dom";

// const InfoContainer = styled.div`
// `;
// // 고정 프로필바
// const InfoWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
// 	width: 100%;
// 	height: 270px;
// 	background-color: #f8f1d9;
    
// `;
// const ImgBox = styled.div`
//   text-align: center;
//   margin-top: 110px;
// `;

// const NameText = styled.h1`
//   font-size: 25px;
//   font-weight: bold;
// `;
// const Text = styled.p`
//   margin-bottom: 20px;
//   font-size: large;
  
// `;
// const HashTag = styled.button`
//   border: 0;
//   border-radius: 0.3rem;
//   background-color: #78756c;
//   color: white;
//   height: 30px;
//   margin-top: 10px;
//   margin-right: 10px;
//   padding: 2px 15px;
// `
// const InfoBox = styled.div`
//   /* border: solid 2px;
//   border-color: #afadaa; */
//   width: 30%;
//   margin-top: 190px;
//   margin-left: -120px;
// `;
// const ChangeBox = styled.div`
//   /* border: solid 2px;
//   border-color: #afadaa; */
//   width: 30%;
//   margin-top: 220px;
//   text-align: right;
// `;

// const ChangeBtn = styled.button`
//   border: 0;
//   border-radius: 0.4rem;
//   background-color: #f9bd4f;
//   width: 150px;
//   height: 35px;
  
// `;

// function CustomerPageInfo(){
//   const [data, setdata] = useState({
//     "customerSeq" : 1,
//         "name" : "김싸피",
//         "id" : "ssafy",
//         "email" : "ssafy@gmail.com",
//         "img" : "img1.png",
//         "hairCondition" : [
//             "얇은 모발",
//             "굵은 모발"
//         ],
//         "face" : "계란형",
//         "futureConsulting" : [
//             {
//                 "consultingSeq" : 10,
//                 "designerImg" : "img1.png",
//                 "reviewScore" : 4.7,
//                 "name" : "지윤",
//                 "consultingDate" : "08.21",
//                 "consultingDateDay" : "금",
//                 "consultingStartTime" : "18:30",
//                 "url" : " ",
//             },
//             {
//                 "consultingSeq" : 11,
//                 "designerImg" : "img2.png",
//                 "reviewScore" : 4.8,
//                 "name" : "민지",
//                 "consultingDate" : "08.22",
//                 "consultingDateDay" : "금",
//                 "consultingStartTime" : "18:30",
//                 "url" : " ",
//             }
        
//         ],
//         "pastConsuting" : [
//             {
//                 "consultingSeq" : 8,
//                 "designerImg" : "img1.png",
//                 "allReviewScore" : 4.7,
//                 "name" : "지윤",
//                 "consultingDate" : "05.21",
//                 "consultingDateDay" : "금",
//                 "consultingStartTime" : "18:30",
//                 "consultingEndTime" : "17:00",
//                 "myReviewScore" : 4.9,
//                 "reviewContent" : "옛날에 남긴 나의 한줄평",
//             },
//             {
//                 "consultingSeq" : 9,
//                 "designerImg" : "img1.png",
//                 "allReviewScore" : 4.7,
//                 "name" : "민지",
//                 "consultingDate" : "06.21",
//                 "consultingDateDay" : "금",
//                 "consultingStartTime" : "18:30",
//                 "consultingEndTime" : "17:00",
//                 "myReviewScore" : 4.9,
//                 "reviewContent" : "옛날에 남긴 나의 한줄평",
//             },
        
//         ]
//   });
//   return(
//     <InfoContainer>
//       <InfoWrapper>
//         <ImgBox>
//           <NameText>{data.name}</NameText>
//             <ProfileImg />
//         </ImgBox>
        
//         <InfoBox>
//           <Text>{data.id}</Text>
//           <Text>{data.email}</Text>
//           {data.hairCondition.map((word, index) => (
//             <HashTag key={index}> #{word} </HashTag>
//           ))}
//         </InfoBox>

//         <ChangeBox>
//           <ChangeBtn><Link to="/editcustomerinfo">회원 정보 변경</Link></ChangeBtn>
//         </ChangeBox>
//       </InfoWrapper>
//     </InfoContainer>
//     )
// }


// export default CustomerPageInfo;