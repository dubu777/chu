import styled from "styled-components";
import { Link } from "react-router-dom";
import { atom, useRecoilState, selector } from 'recoil';
// import { isLoggedInState } from './yourRecoilAtoms'; // Recoil 상태 import


const Container = styled.div`
	background: url('./img/login.jpg');
	filter: invert(5%);
	background-size: cover ;
	width: 100vw;
  height: 100vh;
	display:flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 150px;
	font-family: 'Cormorant Garamond';
	/* font-family: "Apple-B";  */
`;

const Wrapper = styled.div`
	border: 0;
	border-radius: 0.8rem;
	width: 35%;
	height: 45%;
	background-color: rgb(242, 234, 211, 0.5);
	color: black;
`;
const Title = styled.h1`
	margin-top: 10px;
	margin-bottom: 18px;
	font-size: 30px;
`;
const Input = styled.input`
	width: 75%;
	height: 50px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const P = styled.p`
	margin-top: -15px;
`;
const LogInBox = styled.div`
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const SubmitBox = styled.div`
	display:flex;
	justify-content: space-between;
	margin-left: 12%;
	margin-right: 12%;
	color:white;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.4rem;
	/* font-family: 'Cormorant Garamond'; */
	font-size: 15px;
	width: 60px;
`;

const FindBox = styled.div`
	text-align: right;
	margin-right: 12%;
	color: white;
`;

// Recoil 상태로 로그인 상태를 저장
export const isLoggedInState = atom({
	key: 'isLoggedInState',
	default: false, // 기본값은 로그인되어 있지 않은 상태(false)
  });
// selector 정의
export const usernameState = selector({
	key: 'usernameState',
	get: ({ get }) => {
	  const isLoggedIn = get(isLoggedInState);
	  return isLoggedIn ? 'user123' : null;
	},
  });

function LogIn() {
	const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
	// 폼 제출 핸들러를 정의
	function handleFormSubmit(event){
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const username = formData.get('username'); // ID 필드의 값 가져오기
		const password = formData.get('password'); // 비밀번호 필드의 값 가져오기
		
		// 임시코드
		if (username === 'user' && password === 'password') {
			setLoggedIn(true);
		  }
		};
	
	return(
		<Container>
			<Wrapper>
				<LogInBox>
				<Title>Log in</Title>
					<form onSubmit={handleFormSubmit}></form>
				<Input type="text" name="username" placeholder="ID" />
            	<br />
            	<Input type="password" name="password" placeholder="Password" />
            	<br />
				</LogInBox>
				<br />
				<SubmitBox>
					<P><Link to="/signup">Sign up</Link></P>
					<P><Btn type="submit">Log in</Btn></P>
				</SubmitBox> 
				<br></br>
				<FindBox><Link to="/findid">Find id</Link></FindBox>
				<FindBox><Link to="/findpw">Find Password</Link></FindBox>
			</Wrapper>
		</Container>
	);
}

export default LogIn;