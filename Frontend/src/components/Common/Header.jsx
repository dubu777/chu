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
import { ToastContainer, toast } from 'react-toastify';

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
  font-family: sans-serif;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.div)`
  margin-right: 10px;
  width: 95px;
  height: 25px;
  color: #353432;
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
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 500;
`;
const NotificationBadge = styled.div`
  /* 원하는 스타일을 추가하세요 */
  border-radius: 50%;
  background-color: red;
  color: white;
  padding: 5px 10px;
  position: relative;
  top: -10px;
  right: -10px;
`;

const NotificationItem = styled.div`
  /* 알림 아이템 스타일을 추가하세요 */
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const logoVariants = {
  normal: {
    color: "black",
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
    backgroundColor: "#f9f9f9"
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
  const [notifications, setNotifications] = useState([]);
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

  // // 알림 조회
  // const { data: notifications = [], refetch } = useQuery(
  //   ["notifications", userType, userSeq],
  //   async () => {
  //     if (userType === "guest") return [];
  //     if (userType === "designer") return getDesignerNotification(userSeq);
  //     if (userType === "customer") return getCustomerNotification(userSeq);
  //   },
  //   {
  //     retry: false,
  //   }
  // );

  // // 알림 읽기
  // const handleReadNotification = async (alertSeq) => {
  //   try {
  //     if (userType === "designer") await readDesignerNotification(alertSeq);
  //     if (userType === "customer") await readCustomerNotification(alertSeq);
  //     refetch();
  //   } catch (error) {
  //     console.error("Error reading notification", error);
  //   }
  // };
  useEffect(() => {
    // 알림을 조회하는 함수
    const fetchNotifications = async () => {
      let fetchedNotifications = [];

      if (userType === 'designer') {
        fetchedNotifications = await getDesignerNotification(userSeq);
      } else {
        fetchedNotifications = await getCustomerNotification(userSeq);
      }

      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, [userSeq, userType]);

  // 알림 클릭 시 동작
  const handleNotificationClick = async (alertSeq) => {
    if (userType === 'designer') {
      await readDesignerNotification(alertSeq);
    } else {
      await readCustomerNotification(alertSeq);
    }

    // 알림 제거
    const updatedNotifications = notifications.filter(notif => notif.alertSeq !== alertSeq);
    setNotifications(updatedNotifications);
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


  return (
    <Nav
      variants={navVariants}
      animate={navAnimation} 
      initial={"top"}
    >
      <Col>
      <Items>
        <Logo
          onClick={() => navigate("/")}
          variants={logoVariants}
          whileHover="active"
          initial="nomal"
        >
          Chu
        </Logo>
        
          <Link to="/">
            <Item variants={logoVariants} whileHover="active" initial="nomal">
              Home
            </Item>
          </Link>
        </Items>
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
