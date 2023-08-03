import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(220, 220, 220);
  
`;
const SelectedBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 5px;
  padding-bottom: 5px; */
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
  const [data, setData] = useState("");

  const dataTest = () => {
    axios.get('http://localhost:8081')
      .then(response => {
        setData(response.data);
      });
  }
  console.log(data);

  // const [data, setData] = useState(
  //   {
  //     "allCutHairStyle": [
  //         {
  //             "hairStyleSeq": 1,
  //             "hairStyleLabel": "젤리펌"
  //         },
  //         {
  //             "hairStyleSeq": 2,
  //             "hairStyleLabel": "히피펌"
  //         },
  //         {
  //             "hairStyleSeq": 3,
  //             "hairStyleLabel": "가르마펌"
  //         },
  //         {
  //             "hairStyleSeq": 4,
  //             "hairStyleLabel": "쉐도우펌"
  //         }
  //     ],
  //     "allPermHairStyle": [
  //         {
  //             "hairStyleSeq": 5,
  //             "hairStyleLabel": "레이어드컷"
  //         },
  //         {
  //             "hairStyleSeq": 6,
  //             "hairStyleLabel": "허쉬컷"
  //         },
  //         {
  //             "hairStyleSeq": 7,
  //             "hairStyleLabel": "가일컷"
  //         },
  //         {
  //             "hairStyleSeq": 8,
  //             "hairStyleLabel": "울프컷"
  //         }
  //     ],
  //     "designerListCnt": 3,
  //     "designerList": [
  //         {
  //             "designerSeq": 1,
  //             "designerImg": "202307211500",
  //             "reviewScore": 4.5,
  //             "designerName": "원영",
  //             "introduction": "여성 펌 전문 디자이너 원영입니다 ^_^",
  //             "reviewCnt": 3,
  //             "hairStyleLabel": [
  //                 "젤리펌",
  //                 "히피펌",
  //                 "가르마펌",
  //                 "쉐도우펌"
  //             ],
  //             "likeCnt": 1,
  //             "isLike": true,
  //             "cost": 5000
  //         },
  //         {
  //             "designerSeq": 2,
  //             "designerImg": "202307211503",
  //             "reviewScore": 0.0,
  //             "designerName": "시영",
  //             "introduction": "남성 커트 전문 디자이너 시영입니다.",
  //             "reviewCnt": 1,
  //             "hairStyleLabel": [
  //                 "다운펌",
  //                 "엘리자벳펌",
  //                 "가르마펌",
  //                 "쉐도우펌"
  //             ],
  //             "likeCnt": 0,
  //             "isLike": false,
  //             "cost": 7000
  //         },
  //         {
  //             "designerSeq": 3,
  //             "designerImg": "202307211505",
  //             "reviewScore": 5.0,
  //             "designerName": "승종",
  //             "introduction": "남성 펌 전문 디자이너 승종입니다.",
  //             "reviewCnt": 1,
  //             "hairStyleLabel": [
  //                 "야호펌",
  //                 "하이펌",
  //                 "으악펌",
  //                 "그냥펌"
  //             ],
  //             "likeCnt": 0,
  //             "isLike": false,
  //             "cost": 6000
  //         }
  //     ]
  // }
  // );
  const [selectedStyle, setSelectedStyle] = useState([]);

  const toggleStyleType = (tag) => {
    // 선택된 태그를 { hairStyleSeq, hairStyleLabel } 형식의 객체로 생성
    const selectedTag = {
      'hairStyleSeq': tag.hairStyleSeq,
      'hairStyleLabel': tag.hairStyleLabel,
    };

    // selectedStyle 배열에 이미 해당 태그가 포함되어 있는지 검사
    const isTagSelected = selectedStyle.some(
      (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
    );
  
    if (isTagSelected) {
      // 이미 선택된 태그인 경우, 해당 태그를 제거합니다.
      setSelectedStyle((prev) =>
        prev.filter((selectedTag) => selectedTag.hairStyleSeq !== tag.hairStyleSeq)
      );
    } else {
      // 선택되지 않은 태그인 경우, 해당 태그를 추가합니다.
      setSelectedStyle((prev) => [...prev, selectedTag]);
    }
  };


  const [activeBtn, setActiveBtn] = useState(null); // 초기 상태는 아무 버튼도 선택되지 않은 상태로 설정
  // const dataObject = {
  //   "customerSeq" : 2
  // };
  const handleBtnClick = async (btnName) => {
    if (activeBtn === btnName) {
      setActiveBtn(null); // 이미 선택된 버튼을 누르면 선택 해제
    } else {
      setActiveBtn(btnName); // 새로운 버튼 선택
    }
  };
  const [handleMap, setHandleMap] = useState(false);
  const toggleMap = () => {
    setHandleMap((prev) => !prev);
  };
  // selectedStyle 배열의 변경 상태를 확인하고 콘솔에 출력
  // 백엔드로 보내야 할 통신 데이터
  useEffect(() => {
    const hairStyleSeqNumbers = selectedStyle.map((tag) => tag.hairStyleSeq);
    console.log("hairStyleSeq numbers:", hairStyleSeqNumbers);
  }, [selectedStyle]);
  
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
          {data.allCutHairStyle.map((tag) => (
  <HashTag
    key={tag.hairStyleSeq}
    onClick={(e) => {e.stopPropagation(); toggleStyleType(tag);}}
    selected={selectedStyle.some(
      (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
    )}
  >
    #{tag.hairStyleLabel}
  </HashTag>
))}
        </SelectBox>
        <SelectText>펌</SelectText>
        <SelectBox>
        {data.allPermHairStyle.map((tag) => (
  <HashTag
    key={tag.hairStyleSeq}
    onClick={(e) => {e.stopPropagation(); toggleStyleType(tag);}}
    selected={selectedStyle.some(
      (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
    )}
  >
    #{tag.hairStyleLabel}
  </HashTag>
))}
        </SelectBox>
        <SelectedText>선택</SelectedText>
        <SelectedBox>
        {selectedStyle.map((tag) => (
  <HashTag
    key={tag.hairStyleSeq}
    onClick={(e) => {e.stopPropagation(); toggleStyleType(tag);}}
    selected={selectedStyle.some(
      (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
    )}
  >
    #{tag.hairStyleLabel}
  </HashTag>
))}
      </SelectedBox>
      <SelectedText></SelectedText>
      <SelectedBox>
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
          <DesignerList data={data}  />
    </Container>
  )
}
export default ListView;