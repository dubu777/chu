import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { accessTokenState, loginState } from "../../recoil";
import { getDesignerNotification } from "../../apis";
import { useState } from "react";
import { useQuery } from "react-query";

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

const logoVariants = {
  normal: {
    color: "white",
  },
  active: {
    color: "rgb(244,153,26)",
    trasition: {
      type: "tween",
      duration: 0.05,
    },
  },
};

function Header() {
  const userSeq = localStorage.getItem("userSeq");
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(accessTokenState);
  //통신되면 해보기(알림 조회)
  // const {
  //   data: notifications = [],
  //   isLoading, 
  //   isError,
  // } = useQuery(["notificationsData", userSeq], () =>
  //   getDesignerNotification(userSeq)
  // );

  // 유저 타입에 따른 마이페이지 router
  const handleNavigation = () => {
    if (localStorage.getItem("userType") === "customer") {
      const customerSeq = userSeq;
      navigate(`/customermypage/${customerSeq}`);
    } else if (localStorage.getItem("userType") === "designer") {
      const designerSep = userSeq;
      navigate(`/designermypage/${designerSep}`);
    }
  };

  // 로그 아웃 함수(토큰 삭제)
  const handleLogout = useRecoilCallback(({ snapshot }) => async () => {
    setToken(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('userSeq');
    localStorage.removeItem('userName');
    navigate('/')
  });
  
  // 통신되면 열기
  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error fetching notifications</p>;

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
            <Item variants={logoVariants} whileHover="active" initial="nomal">
              Home
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
      <Link to="/checkreserve">kakao pay</Link>
      </Col>
      <Col>
        {isLogIn ? (
          <>
            <Item
              variants={logoVariants}
              whileHover="active"
              initial="nomal"
              onClick={handleLogout}
            >
              Log Out
            </Item>
            <Item
              variants={logoVariants}
              whileHover="active"
              initial="nomal"
              onClick={handleNavigation}
            >
              My Page
            </Item>
          </>
        ) : (
          <>
            <Link to="usertype">
              <Item variants={logoVariants} whileHover="active" initial="nomal">
                Sign up
              </Item>
            </Link>
            <Link to="/login">
              <Item variants={logoVariants} whileHover="active" initial="nomal">
                Log in
              </Item>
            </Link>
          </>
        )}
      </Col>
    </Nav>
  );
}
export default Header;
