// 여기는 고객 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import ProfileImg from "../../components/CustomerComponent/ProfileImg";

const Container = styled.div`
  /* font-family: "Apple-B";   */
  font-family: "Blue-road";
`;
// 고정 프로필바
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
	width: 100%;
	height: 300px;
	background-color: #f8f1d9;
  /* font-family: "Blue-road"; */
  /* font-family: "Apple-B";   */
    
`;
const ImgBox = styled.div`
  text-align: center;
  margin-top: 130px;
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
  margin-right: 10px;
  padding: 2px 15px;
`
const InfoBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 225px;
  margin-left: -120px;
`;
const ChangeBox = styled.div`
  /* border: solid 2px;
  border-color: #afadaa; */
  width: 30%;
  margin-top: 240px;
  text-align: right;
`;

const ChangeBtn = styled.button`
  border: 0;
  border-radius: 0.4rem;
  background-color: #f9bd4f;
  width: 150px;
  height: 35px;
  
`;

function CustomerPageInfo(){
  const [username, setusername] = useState('송지윤');
  const [id, setid] = useState('내머리가너무나나빠서');
  const [mail, setmail] = useState('wldbs8241@naver.com');
  const [hashtag, sethashtag] = useState(['키워드로 적어보자','얇은 모발', '반곱슬', '계란형']);

  return(
    <Container>
      <Wrapper>
        <ImgBox>
          <NameText>{username}</NameText>
            <ProfileImg />
        </ImgBox>
        
        <InfoBox>
          <Text>{id}</Text>
          <Text>{mail}</Text>
          {hashtag.map((word, index) => (
            <HashTag key={index}> #{word} </HashTag>
          ))}
        </InfoBox>

        <ChangeBox>
          <ChangeBtn>회원 정보 변경</ChangeBtn>
        </ChangeBox>
      </Wrapper>
    </Container>
    )
}


export default CustomerPageInfo;