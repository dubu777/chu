import { styled } from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { accessTokenState, loginState } from "../../recoil";
import {
  getDesignerNotification,
  getCustomerNotification,
  readCustomerNotification,
  readDesignerNotification,
} from "../../apis";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Dropdown, Badge } from "react-bootstrap";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 45px;
  top: 0;
  font-size: 18px;
  padding: 20px 60px;
  color: white;
  font-family: sans-serif;
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
const TestDiv = styled.div`

`;
const TestUl = styled.ul`
`;

const TestLi = styled.li`
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
const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(100, 93, 81, 1)"
  },
};

function Header() {
  const userSeq = localStorage.getItem("userSeq") || 0;
  const userType = localStorage.getItem("userType") || "guest";
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(accessTokenState);
  const [show, setShow] = useState(false);
  const {scrollY} = useScroll();

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
    localStorage.removeItem("userType");
    localStorage.removeItem("userSeq");
    localStorage.removeItem("userName");
    navigate("/");
  });

  // 알림 조회
  const { data: notifications = [], refetch } = useQuery(
    ["notifications", userType, userSeq],
    async () => {
      if (userType === "guest") return [];
      if (userType === "designer") return getDesignerNotification(userSeq);
      if (userType === "customer") return getCustomerNotification(userSeq);
    },
    {
      retry: false,
    }
  );

  // 알림 읽기
  const handleReadNotification = async (alertSeq) => {
    try {
      if (userType === "designer") await readDesignerNotification(alertSeq);
      if (userType === "customer") await readCustomerNotification(alertSeq);
      refetch();
    } catch (error) {
      console.error("Error reading notification", error);
    }
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80){
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
    });
  },[scrollY, navAnimation])

  console.log(notifications, "알림");

  const handleMap = () => {
    window.open(`/map`, '안녕')
    // window.open(`/mapsearch`, '안녕', 'width=600, height=600')
  }
  return (
    <Nav
      variants={navVariants}
      animate={navAnimation} 
      initial={"top"}
    >
      <Col>
        <button onClick={handleMap}>지도검색</button>
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
      <Link to="/worldcuproom/1">worldcuproom</Link>
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

            {/* <Dropdown show={show} onToggle={() => setShow(!show)}>
              <Dropdown.Toggle variant="success">
                알림
                {notifications.length > 0 && (
                  <Badge pill bg="primary">
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {notifications.map((notification) => (
                  <Dropdown.Item key={notification.id}>
                    <p>{notification.message}</p>
                    <button
                      onClick={() =>
                        handleReadNotification(notification.alertSeq)
                      }
                    >
                      읽기
                    </button>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown> */}

            <TestDiv>
              <TestUl>
                {notifications.map((notification) => (
                  <TestLi key={notification.id}>
                    <p>{notification.message}</p>
                    <span
                      onClick={() =>
                        handleReadNotification(notification.alertSeq)
                      }
                    >
                      읽기
                    </span>
                  </TestLi>
                ))}
              </TestUl>
            </TestDiv>
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
