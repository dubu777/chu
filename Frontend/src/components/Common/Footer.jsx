import { styled } from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: #605b52c5;
  margin-top: 100px;
`;
const TextBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const Text = styled.p`
  margin-right: 20px;
`;
function Footer() {


  return (
    <Container>
      <TextBox>
        <Text>서비스 이용약관</Text>
        <Text>개인정보처리방침</Text>
        <Text>영상기기 관리방침</Text>
        <Text>이메일 무단수집 거부</Text>
      </TextBox>
      <TextBox>
        <Text>(주)CHU 대표이사: 김선진</Text>
        <Text>본사 : 서울특별시 용산구 한강대로 100 (한강로2가) 6층</Text>
      </TextBox>
    </Container>
  );
}
export default Footer;
