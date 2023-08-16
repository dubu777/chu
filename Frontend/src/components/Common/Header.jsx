import { styled } from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { accessTokenState, loginState } from "../../recoil";
import {
  getDesignerNotification,
  getCustomerNotification,
  getNotifications,
  readCustomerNotification,
  readDesignerNotification,
} from "../../apis";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  font-size: 18px;
  padding: 0 40px;
  z-index: 1000;
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
  cursor: pointer;
`;
const NotificationBadge = styled.div`
  position: relative;
  display: inline-block;
`;

const Badge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 7px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
`;

const NotificationList = styled.div`
  position: absolute;
  width: 300px;
  right: -10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  overflow: auto;
  max-height: 300px;
  z-index: 1000;
  border-radius: 7px;
`;
const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #979797;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &:last-child {
    border-bottom: none;
  }
`;
const DateWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
`;

const Img = styled.img`
  width: 28px;
  height: 28px;
`;
const Hr = styled.div`
  border: 1px solid #eee;
  width: 100%;
  margin: 10px 0;
`;
const LogoImg = styled(motion.img)`
  width: 130px;  // 원하는 크기로 조절하세요
  height: auto;
  cursor: pointer;
`;
const ReadBtn = styled.p`
  font-size: 16px;
`;
const logoVariants = {
  normal: {
    color: "black",
  },
  active: {
    color: "rgb(244,153,26)",
    trasition: {
      duration: 0.01,
    },
  },
};
const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "#f9f9f9",
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
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  const { scrollY } = useScroll();
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
    localStorage.removeItem("consultingSeq");
    navigate("/");
  });

  // 알림 토글

  const toggleNotificationList = () => {
    setShowNotificationList((prev) => !prev);
  };
  // 알림 조회
  const {
    data: notifications = [],
    refetch,
    isError,
    isLoading,
  } = useQuery(
    ["notifications", userType, userSeq],
    async () => {
      if (!userType) {
        return;
      }
      if (userType === "designer") return getDesignerNotification(userSeq);
      if (userType === "customer") return getCustomerNotification(userSeq);
    },
    {
      retry: false,
    }
  );


  // 알림 읽기
  const handleReadNotification = async (alertSeq) => {
    console.log(alertSeq, "알림 읽기 입장");
    try {
      if (userType === "designer") await readDesignerNotification(alertSeq);
      if (userType === "customer") await readCustomerNotification(alertSeq);
      refetch();
    } catch (error) {
      console.error("Error reading notification", error);
    }
  };
  const [alert, setAlert] = useState(false);
  const toggleAlert = () => {
    setAlert((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  console.log(notifications, "알림");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notifications</div>;

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Items>
          <LogoImg
            src="icon/logo.svg"
            onClick={() => navigate("/")}
          />
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
            <NotificationBadge>
              <Badge>
                {
                  notifications.filter((notification) => !notification.check)
                    .length
                }
              </Badge>
              <Img onClick={toggleAlert} src="/icon/alert.png" />
              {alert ? (
                <NotificationList>
                  {notifications
                    .filter((notification) => !notification.check)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.alertSeq}

                      >
                        <DateWrap>
                          {notification.pushDate}
                          <ReadBtn
                                                  onClick={() =>
                                                    handleReadNotification(notification.alertSeq)
                                                  }
                          >읽기</ReadBtn>
                        </DateWrap>
                        <Hr />
                        {userType === "designer"
                          ? `${notification.customerName} 님의 상담이 취소되었습니다.`
                          : `${notification.designerName} 님의 상담이 취소되었습니다.`}
                        {/* <Hr/> */}
                      </NotificationItem>
                    ))}
                </NotificationList>
              ) : null}
            </NotificationBadge>
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
