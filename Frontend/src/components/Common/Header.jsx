import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import { accessTokenState, loginState, loginResultState, customerLogInDataState } from "../../recoil";
import { useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: fixed; */
  width: 100%;
  height: 45px;
  top: 0;
  font-size: 18px;
  padding: 20px 60px;
  color: white;
  background-color: rgb(100, 93, 81);
  font-family: "Sandol-B";    
  
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.div)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;
  

const Item = styled(motion.li)`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const logoVariants = {
  normal: {
    color: "white"
  },
  active: {
    color: "rgb(244,153,26)",
    trasition: {
      type: "tween",
      duration: 0.05,
    },
  }
};

function Header() {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(accessTokenState);
  // 유저 정보 받아오는 Recoil. 수정 예정
  const [loginResult, setLoginResult] = useRecoilState(loginResultState);
  const [userData, setUserData] = useRecoilState(customerLogInDataState);


  //유저 시퀀스 저장
  const UserSeq = isLogIn && localStorage.getItem("userType") === "customer" 
  ? localStorage.getItem("userSeq")
  : localStorage.getItem("userSeq")
  // 유저 타입에 따른 마이페이지 router
  const handleNavigation = () => {
    if (localStorage.getItem("userType") === 'customer') {
      const customerSeq = UserSeq
      navigate(`/customermypage/${customerSeq}`);
    } else if (localStorage.getItem("userType") === 'designer') {
      const designerSep = UserSeq
      navigate(`/designermypage/${designerSep}`);
    };
  }

  // 로그 아웃 함수(토큰 삭제)
  const handleLogout = useRecoilCallback(({ snapshot }) => async () => {
    setToken(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('userSeq');
    localStorage.removeItem('userName');
    navigate('/')
  });
  return (
    <Nav>
      <Col>
      <Logo 
      onClick={() => navigate("/")}
      variants={logoVariants}
      whileHover="active"
      initial="nomal"
      >
        Chu
      </Logo>
        <Items>
          <Link to="/">
            <Item 
              variants={logoVariants}
              whileHover="active"
              initial="nomal"
              >Home
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
      <Link to="/checkreserve">kakao pay</Link>
      </Col>
      <Col>
          { isLogIn ?  
            <>
              <Item 
                variants={logoVariants}
                whileHover="active"
                initial="nomal"
                onClick={handleLogout}
                >Log Out
              </Item>
              <Item 
                variants={logoVariants}
                whileHover="active"
                initial="nomal"
                onClick={handleNavigation}
                >My Page
              </Item>
            </>
          : 
            <>
              <Link to="usertype">
                <Item 
                  variants={logoVariants}
                  whileHover="active"
                  initial="nomal"
                  >Sign up
                </Item>
              </Link>
              <Link to="/login">
                <Item 
                  variants={logoVariants}
                  whileHover="active"
                  initial="nomal"
                  >Log in
                </Item>
              </Link>
            </>
          }
        
      </Col>
    </Nav>
  );
}
export default Header;