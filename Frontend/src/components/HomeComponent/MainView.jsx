import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

const ClickImg = styled.img`
  height: 310px;
  width: 500px;
  border-radius: 0.7rem;
`;

const WorldcupImg = styled.img`
  object-fit: cover;
  height: 310px;
  width: 240px;
  border-radius: 0.7rem;
`;

const Container = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 50px;
  font-family: "Blue-road";  
`;

const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Box = styled.div`
`;
const Title = styled.h1`
  font-family: 'omyu_pretty'; 
  font-size: 25px;
  font-family: "Blue-road";  
  font-weight: bold;

`;
const P = styled.p`
  font-size: 15px;
`;

function MainView(){
  return(
    <Container>
    <Title>Style의 발견 🎁</Title>
    <br></br>
      <Wrapper>
        <Box>
          <ClickImg src="./img/listview.jpg"></ClickImg>
          <P>헤어스타일 상담 예약 바로가기</P>
        </Box>
        {/* alert창 띄우고 업로드 화면으로 이동 */}
        <Box onClick={()=> swal("Style worldCup을 위한 파일 등록창으로 이동합니다 😉")}>
          <Link to="/worlducupimgupload">
          <ClickImg src="./img/worldcupimg.png"></ClickImg>
          {/* <WorldcupImg src="worldcup1.jpg"></WorldcupImg> */}
          <P>스타일 월드컵은 어때요?</P>
          </Link>
        </Box>
      </Wrapper>
  </Container>
  )
}

export default MainView;