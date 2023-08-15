import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setFindId, setExistState } from "../../recoil/auth";

const Container = styled.div`
	background: url('./img/findid.jpg');
	filter: invert(5%);
	background-size: cover ;
  width: 100vw;
  height: 100vh;
	display:flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 150px;
`;

const Wrapper = styled.div`
	border: 0;
	border-radius: 0.8rem;
	width: 35%;
	height: 45%;
	background-color: rgb(242, 234, 211, 0.5);
	/* opacity: 0.5; */
	color: black;
`;
const Title = styled.h1`
	margin-top: 10px;
	margin-bottom: 55px;
	font-size: 30px;
`;

const Text = styled.h3`
	margin: 5px 0px;
	font-size: 20px;
`;
const TopBox = styled.div`
	/* justify-content: center; */
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const BottomBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.3rem;
	background-color: rgb(45, 28, 20);
	width:30%;
	height: 40px;
	color: white;
	cursor: pointer;
	margin: 40px 10px;
	font-size: 15px;
`;


function FoundId() {
	const [findIdResult, setFindIdResult] = useRecoilState(setFindId);

	return(
		<Container>
			<Wrapper>
				<TopBox>
					<Title>ID</Title>
					<Text>아이디 찾기 완료</Text>
					<Text>아이디 : {findIdResult}</Text>
				</TopBox>
				<BottomBox>
					<Btn><Link to="/login">Log in</Link></Btn>
					<Btn><Link to="/findpw">Find pw</Link></Btn>
				</BottomBox>	
			</Wrapper>
		</Container>
	);
}
export default FoundId;