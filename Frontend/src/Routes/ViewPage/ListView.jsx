import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import DesignerList from "../../components/DesignerComponent/DesignerList";

const Hr = styled.div`
  margin-top: 20px;
  border-bottom : 2px solid rgb(242,234,211);
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;
`;
const Input = styled(motion.input)`

  position: absolute;
  padding: 7px 10px;
  padding-left: 40px;
  z-index: -1;
  color: black;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 10px;
`;
const Search = styled.form`
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 50px;
  z-index: -1;
  svg {
    height: 25px;
  }
`;
const Svg = styled.svg`
  position: absolute;
  left: -107px;
`;

function ListView() {
  const repeat = [1,2,3,4,5,6,7,8]

  return (
    <Container>
      {/* <Wrapper>
        <Search>
          <Svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </Svg>
          <Input placeholder="search"/>
        </Search>
      </Wrapper> */}
      {
        repeat.map((i) => (
          <DesignerList key={i} />
        ))
      }
    </Container>
  )
}
export default ListView;