import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


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
          <Link to="designerdetail">
            <Item 
              variants={logoVariants}
              whileHover="active"
              initial="nomal"
              >DesignerDetail
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
<<<<<<< Updated upstream
        <Search >
          {/* 나중에 다 옮기기 */}
          <Link to="/consultresultpage">상담결과 작성//</Link>

          {/* 선진 수정 */}
          <Link to="/viduroom">상담사가 방 생성//</Link>
          
          <Link to="/designermypage">디자이너MyPage//</Link>
          <Link to="/customermypage">CustomerMyPage//</Link>
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
        </Search>
=======
          {/* <Link to="/consultresultpage">상담결과 작성//</Link> */}
          {/* <Link to="/viduroom">openvidu//</Link> */}
          <Link to="/designermypage">디자이너MyPage//</Link>
          {/* <Link to="/customermypage">CustomerMyPage//</Link> */}

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
        
>>>>>>> Stashed changes
      </Col>
    </Nav>
  );
}
export default Header;