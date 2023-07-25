import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import DesignerList from "../../components/DesignerComponent/DesignerList";
import { ChevronDownIcon } from '@heroicons/react/20/solid'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(220, 220, 220);
  
`;
const SelectedBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const HashTag = styled(motion.span)`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  margin-right: 10px;
  border: 1px solid black;
  background-color: ${props => props.selected ?"rgb(100,93,81)" :"rgb(250, 248, 242)" };
  color: ${props => props.selected ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
  border-radius: 5px;
  cursor: pointer;
`;
const SelectText = styled.span`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  height: 81%;
  border-bottom: 2px solid rgb(220, 220, 220);
`;
const SelectedText = styled.span`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  height: 85%;
`;
const Grid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  div:nth-child(2),
  div:nth-child(4),
  div:nth-child(6),
  div:nth-child(8) {
    grid-column: span 6;
  }
  margin-top: 20px;
  width: 70%;
  border: 2px solid rgb(220, 220, 220);
  padding: 10px 20px;
  border-radius: 10px;
`;
const SecondGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin-top: 20px;
  width: 70%;
  border: 2px solid rgb(220, 220, 220);
  padding: 10px 20px;
  border-radius: 10px;
`;
const BtnBox = styled.div`
  display: flex;
`;
const Btn = styled.button`
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgb(220, 220, 220);
`;

const TBox = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid rgb(220, 220, 220);

`;
const THash = styled.div`
  display: flex;
`;
const TText = styled.span`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  height: 81%;
`;
const TTBox = styled.div`
  display: flex;
  /* justify-content: space-around; */
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
      <SecondGrid>
        <TBox>
          <TText>커트</TText>
          <THash>
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
          </THash>
        </TBox>
        <TBox>
          <TText>펌</TText>
          <THash>
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
          </THash>
        </TBox>
        <TTBox>
          <TText>선택</TText>
          <THash>
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
          </THash>
        </TTBox>
      </SecondGrid>
      <Grid>
        <SelectText>커트</SelectText>
        <SelectBox>
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
        </SelectBox>
        <SelectText>펌</SelectText>
        <SelectBox>
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
        </SelectBox>
        <SelectedText>선택</SelectedText>
        <SelectedBox>
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
      </SelectedBox>
      <SelectedText></SelectedText>
      <SelectedBox>
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
      </SelectedBox>
      </Grid>
      <BtnBox>
        <Btn>평점순</Btn>
        <Btn>리뷰순</Btn>
        <Btn>좋아요순</Btn>
      </BtnBox>
      {
        repeat.map((i) => (
          <DesignerList key={i} />
        ))
      }
    </Container>
  )
}
export default ListView;