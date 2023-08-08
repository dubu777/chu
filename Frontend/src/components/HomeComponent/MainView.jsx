import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import swal from "sweetalert";
import { motion,AnimatePresence,useAnimation }from "framer-motion";
import Recommend from "./Recommend";


const ClickImg = styled.img`
  height: 310px;
  width: 500px;
  border-radius: 0.7rem;
  object-fit: cover;
  &:hover {
    transform: scale(1.02);
  }
`;

const WorldcupImg = styled.img`
  object-fit: cover;
  height: 310px;
  width: 240px;
  border-radius: 0.7rem;
`;

const Container = styled.div`
  margin-left: 170px;
  margin-right: 170px;
  margin-top: 50px;
  font-family: "Blue-road";  
`;

const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Box = styled(motion.div)`

`;
const pofolVariants = {
	nomal: {
		scale: 1,
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2
		},
	},
}
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
        <Box 
          // onClick={dataTest}
          variants={pofolVariants}
					initial="nomal"
					whileHover="hover">
          <Link to="/listview">
          <ClickImg src="./img/listview.jpg"></ClickImg>
          <P>헤어스타일 상담 예약 바로가기</P>
          </Link>
        </Box>
        {/* alert창 띄우고 업로드 화면으로 이동 */}
        <Box 
          onClick={()=> swal("Style worldCup을 위한 파일 등록창으로 이동합니다 😉")}
          variants={pofolVariants}
					initial="nomal"
					whileHover="hover"
          >
          <Link to="/worlducupimgupload">
          <ClickImg src="./img/worldcupimg.png"></ClickImg>
          {/* <WorldcupImg src="worldcup1.jpg"></WorldcupImg> */}
          <P>스타일 월드컵은 어때요?</P>
          </Link>
        </Box>
      </Wrapper>
      <Recommend/>
  </Container>
  )
}

export default MainView;