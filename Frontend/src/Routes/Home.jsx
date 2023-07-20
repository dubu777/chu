import { styled } from "styled-components";
import css from "../font/font.css"
import ClickMenu from "../components/HomeComponent/ClickMenu";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.img`
  width: 100vw;
  height: 110vh;
`;
const ImgText = styled.h2`
  font-family: 'Amiri';
  font-size: 40px;
  color: white;
  position: absolute;
  top: 50%;
  left: 40%;
`;

function Home() {
  return (
    <Wrapper>
      <Main src="./img/main.jpg"></Main>
      <ImgText>Change Hair & U</ImgText>
      <ClickMenu />
    </Wrapper>
  );
}
export default Home;