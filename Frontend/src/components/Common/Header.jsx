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
import { useQuery, useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

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
  padding: 5px 10px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
`;

const NotificationList = styled.div`
  position: absolute;
  width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  overflow: auto;
  max-height: 300px;
  z-index: 1000;
`;
const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const Img = styled.img`
  width: 28px;
  height: 28px;
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
  const fetchNotifications = async () => {
    if (!userSeq) {
      return;
    }
  
    if (userType === "customer") {
      return await getCustomerNotification(userSeq);
    } else if (userType === "designer") {
      return await getDesignerNotification(userSeq);
    } 
  };

  // 알림 조회를 위한 useQuery 훅
  const {
    data: notifications = [],
    isError,
    isLoading,
    refetch,
  } = useQuery("notifications", fetchNotifications, {
    enabled: Boolean(localStorage.getItem("userType")), // localStorage에 userType이 없으면 쿼리를 실행하지 않음
    retry: false,
  });
  const readNotification = async (alertSeq) => {
    const userType = localStorage.getItem("userType") || "guest";

    if (userType === "customer") {
      return await readCustomerNotification(alertSeq);
    } else if (userType === "designer") {
      return await readDesignerNotification(alertSeq);
    } else {
      throw new Error("Invalid user type for reading notifications");
    }
  };
  const mutation = useMutation(readNotification, {
    onSuccess: () => {
      refetch(); // 알림 읽기가 성공하면, 알림 데이터를 다시 가져옴
    },
  });
  const handleNotificationClick = async (alertSeq) => {
    try {
      await mutation.mutateAsync(alertSeq);
      toast.success("Notification marked as read.");
    } catch (error) {
      toast.error("Failed to mark the notification as read.");
    }
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
            <NotificationBadge>
              <Badge>{notifications.length}</Badge>
              <Img src="/icon/notification.png" alt="Alarm Icon" />
              <NotificationList>
                {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.alertSeq}
                      onClick={() =>
                        handleNotificationClick(notification.alertSeq)
                      }
                    >
                      {notification.message}
                    </NotificationItem>
                    
                  ))}
              </NotificationList>
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
