import { styled } from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
function Footer() {


  return (
    <Container>
      Footer 자리
    </Container>
  );
}
export default Footer;
