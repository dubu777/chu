import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DesignerList from "../../components/DesignerComponent/DesignerList";
import axios from "axios";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65vw;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(220, 220, 220);
  
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
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid gray;
  background-color: ${props => props.selected ?"rgb(100,93,81)" :"rgb(255, 255, 254)" };
  color: ${props => props.selected ?"rgb(255, 255, 255)" :"rgb(0,0,0)" };
  border-radius: 5px;
  cursor: pointer;
`;
const SelectText = styled.span`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  height: 79%;
  /* border-bottom: 1px solid rgb(220, 220, 220); */
  margin-bottom: 10px;
  padding-bottom: 10px;
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
  border: 1px solid rgb(148, 148, 148);
  /* box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); */
  /* box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); */
  padding: 10px 20px;
  border-radius: 10px;
`;

const BtnBox = styled.div`
  display: flex;
  margin-top: 20px;
  
`;
const Btn = styled(motion.button)`
  border-radius: 5px;
  border: 1px solid rgb(220, 220, 220);
  padding: 6px 15px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 13px;
  background-color: ${props => (props.active ? 'rgb(244,153,26)' : 'white')};
`;
const MapBtn = styled.button`
  border-radius: 5px;
  border: 1px solid rgb(220, 220, 220);
  font-weight: 600;
  font-size: 13px;
  padding: 6px 15px;
  background-color: ${props => (props.handleMap ? 'rgb(244,153,26)' : 'white')};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid rgb(91, 89, 89);
  border-radius: 10px;
  width: 300px;
  height: 35px;
  margin-top: 30px;
`;
const Input = styled.input`
  border: 0;
  width: 260px;
  &:focus {
    outline: none;
    border: none;
  }
`;
const SearchImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 0 10px;

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
  const [activeBtn, setActiveBtn] = useState(null); // 초기 상태는 아무 버튼도 선택되지 않은 상태로 설정
  const dataObject = {
    "customerSeq" : 2
  };
  const handleBtnClick = async (btnName) => {
    if (activeBtn === btnName) {
      setActiveBtn(null); // 이미 선택된 버튼을 누르면 선택 해제
    } else {
      setActiveBtn(btnName); // 새로운 버튼 선택
    }
  
    if (btnName === "평점순") {
      try {

        const response = await axios.get("https://api.example.com/designers/sortByRating", { params: dataObject });
        console.log(response.data);
        return response.data
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [handleMap, setHandleMap] = useState(false);
  const toggleMap = () => {
    setHandleMap((prev) => !prev);
  };
  return (
    <Container>
      <Box>
      <SearchBox>
        <SearchImg src="./icon/search.png"/>
        <Input placeholder="Search" />
      </SearchBox>
      </Box>
      <Wrapper>
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
      </Wrapper>
      <BtnWrapper>
      <BtnBox>
        <Btn 
          active={activeBtn === '평점순'}
          onClick={() => handleBtnClick('평점순')}
        >
          평점순
        </Btn>
        <Btn 
          active={activeBtn === '리뷰순'}
          onClick={() => handleBtnClick('리뷰순')}
        >
          리뷰순
        </Btn>
        <Btn 
          active={activeBtn === '좋아요순'}
          onClick={() => handleBtnClick('좋아요순')}
        >
          좋아요순
        </Btn>
      </BtnBox>
      <BtnBox>
      <MapBtn 
        handleMap={handleMap}
        onClick={toggleMap}>
        내 주변 디자이너 찾기
      </MapBtn>
      </BtnBox>
      </BtnWrapper>
      {
        repeat.map((i) => (
          <DesignerList key={i} />
        ))
      }
    </Container>
  )
}
export default ListView;