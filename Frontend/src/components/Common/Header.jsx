import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import { loginState, useToggleLoginState, useIsLoggedIn } from "../../recoil/auth";
import { useState } from "react";
import { accessTokenState } from "../../recoil/auth";

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
  /* font-family: 'Cormorant Garamond'; */
  /* font-family: 'Pretendard-Regular'; */
  /* font-family: "San Francisco"; */
  /* font-family: 'NanumSquareNeo-Variable'; */
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

    // 토큰 삭제를 위한 콜백 함수
    const handleLogout = useRecoilCallback(({ snapshot }) => async () => {
      // 토큰 삭제
      setToken(null);
      // 토큰 삭제 후 추가적으로 해야 할 작업이 있다면 이곳에 추가하세요.
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
          {/* <Link to="designerdetail">
            <Item 
              variants={logoVariants}
              whileHover="active"
              initial="nomal"
              >DesignerDetail
            </Item>
          </Link> */}
        </Items>
      </Col>
      <Col>
          {/* <Link to="/consultresultpage">상담결과 작성//</Link>
          <Link to="/viduroom">openvidu//</Link>
          <Link to="/designermypage">디자이너MyPage//</Link>
          <Link to="/customermypage">CustomerMyPage//</Link> */}

          { isLogIn ?  
            <>
              <Item 
                variants={logoVariants}
                whileHover="active"
                initial="nomal"
                onClick={handleLogout}
                >Log Out
              </Item>
              <Link to="/customermypage">
                <Item 
                  variants={logoVariants}
                  whileHover="active"
                  initial="nomal"
                  >My Page
                </Item>
              </Link>

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