import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import DesignerList from "../../components/DesignerComponent/DesignerList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const HashTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 5px 10px;
  margin-right: 5px;
  border: 1px solid black;
  background-color: ${props => props.selected ?"rgb(100,93,81)" :"rgb(251, 246, 232)" };
  color: ${props => props.selected ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
  border-radius: 5px;
  margin-top:3px;
`;
function ListView() {
  const repeat = [1,2,3]
  const cutType = ["레이어드컷", "히메컷", "투블럭", "시스루컷", "허쉬컷", "슬릭컷"]
  const permType = ["아이롱펌", "시스루펌", "C컬", "볼륨펌", "쉐도우펌", "베이비펌"]
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);


  const toggleCutType = (tag) => {
    if (selectedCut.includes(tag)) {
      setSelectedCut((prev) => prev.filter((resist) => resist !== tag))
    } else {
      setSelectedCut((prev) => [...prev, tag]);
    }
  };
  const togglePermType = (tag) => {
    if (selectedPerm.includes(tag)) {
      setSelectedPerm((prev) => prev.filter((resist) => resist !== tag))
    } else {
      setSelectedPerm((prev) => [...prev, tag]);
    }
  };
  return (
    <Container>
      <Box>
        {
          cutType.map((tag) => (
            <HashTag
              key={tag}
              onClick={() => toggleCutType(tag)}
              selected={selectedCut.includes(tag)}
            >
              #{tag}
            </HashTag>
          ))
        }
      </Box>
      <Box>
        {
          permType.map((tag) => (
            <HashTag
              key={tag}
              onClick={() => togglePermType(tag)}
              selected={selectedPerm.includes(tag)}
            >
              #{tag}
            </HashTag>
          ))
        }
      </Box>
      <Box>
        {
          selectedCut.map((tag) => (
            <HashTag
              key={tag}
              onClick={() => toggleCutType(tag)}
              selected={selectedCut.includes(tag)}
            >
              #{tag}
            </HashTag>
          ))
        }
      </Box>
      <Box>
        {
          selectedPerm.map((tag) => (
            <HashTag 
              key={tag}
              onClick={() => togglePermType(tag)}
              selected={selectedPerm.includes(tag)}
            >
              #{tag}
            </HashTag>
          ))
        }
      </Box>
      {/* <Box onClick={toggleCutType}>
        {showCutType &&
          cutType.map((tag) => <HashTag>#{tag}</HashTag>)
        }
      </Box>
      <Box onClick={togglePermType}>
        {showPermType &&
          permType.map((tag) => <HashTag>#{tag}</HashTag>)
        }
      </Box> */}
      {
        repeat.map((i) => (
          <DesignerList key={i} />
        ))
      }
    </Container>
  )
}
export default ListView;