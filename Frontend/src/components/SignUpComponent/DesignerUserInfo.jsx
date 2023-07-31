// 나중에 폴더 삭제하기

// import { styled } from "styled-components";
// import SignUpInput from "./SignUpInput";
// import { useNavigate } from "react-router-dom";


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   height: 300px;
//   width: 900px;
//   margin-top: 50px;
//   border-radius: 20px;
//   background-color: rgb(242,234,211);
//   margin-bottom: 20px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;

// const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const SubmitBtn = styled.button`
//   background-color: rgba(244,153,26,0.6);
//   color: black;
//   padding: 10px 55px;
//   border: 0;
//   border-radius: 10px;
//   font-size: 18px;
//   font-weight: bold;
//   transition: background-color 0.3s ease;
//   &:hover {
//   background-color: rgba(244,153,26,1);
//   color: #f7f5e1;
//   }
// `;

// function UserInfoComponet() {
//   const navigate = useNavigate();

//   return (
//       <Container>
//         <Wrapper>
//           <Wrap>
//           <SignUpInput text="이름" />
//           <SignUpInput text="아이디" />
//             {/* <Btn>중복확인</Btn> */}
//           <SignUpInput text="이메일" />
//             {/* <Btn>중복확인</Btn> */}
//           </Wrap>
//           <Wrap>
//           <SignUpInput text="등록번호" placeholder="자격증 등록번호를 입력해주세요"/>
//           <SignUpInput text="비밀번호" placeholder="8~16자리의 비밀번호 ⚠"/>
//           <SignUpInput text="비밀번호 확인" placeholder="비밀번호 확인 ✔" />
//           </Wrap>
//         </Wrapper>
//         <SubmitBtn onClick={() => navigate('/complete')}>회원 가입하기</SubmitBtn>
//       </Container>
//   )
// }
// export default UserInfoComponet;