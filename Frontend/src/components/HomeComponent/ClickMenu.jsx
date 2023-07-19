import styled from "styled-components";

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
`;

const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Box = styled.div`
`;
const Title = styled.h1`
  font-family: 'omyu_pretty'; 
  font-size: 20px;
`;
const P = styled.p`
  font-family: 'omyu_pretty';
  font-size: 20px;
`;

function ClickMenu(){
  return(
    <Container>
    <Title>Style의 발견 🎁</Title>
    <br></br>
      <Wrapper>
        <Box>
          <ClickImg src="./img/listview.jpg"></ClickImg>
          <P>헤어스타일 상담 예약 바로가기</P>
        </Box>
        <Box>
          <ClickImg src="./img/worldcupimg.png"></ClickImg>
          {/* <WorldcupImg src="worldcup1.jpg"></WorldcupImg> */}
          <P>스타일 월드컵은 어때요?</P>
        </Box>
      </Wrapper>
  </Container>
  )
}

export default ClickMenu;