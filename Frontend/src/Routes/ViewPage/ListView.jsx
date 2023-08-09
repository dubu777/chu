import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DesignerList from "../../components/DesignerComponent/DesignerList";
import axios from "axios";
import { useRecoilState } from "recoil";
import {listViewState} from "../../recoil/designer";
import {listinfo, submitStyleFilter} from "../../apis/designer"
import { async } from "q";
import { useQuery } from "react-query";


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
const SelectTag = styled(motion.span)`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid lightgray;
  background-color: ${props => props.selected ?"rgb(182, 171, 153)" :"rgb(255, 255, 254)" };
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
const SubmitBtn = styled.button`
`;
function ListView() {
  const customerSeq = localStorage.getItem('userSeq')
  const { data, isError, isLoading } = useQuery(['designerList', customerSeq], () => listinfo(customerSeq))
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [filterData, setFilterData] = useState();
  const sendData = filterData && filterData.designerListCnt ? filterData : data;
  
  const toggleStyleType = (tag) => {
    const selectedTag = {
      'hairStyleSeq': tag.hairStyleSeq,
      'hairStyleLabel': tag.hairStyleLabel,
    };

    // selectedStyle 배열에 이미 해당 태그가 포함되어 있는지 검사
    const isTagSelected = selectedStyle.some(
      (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
    );
  
    if (isTagSelected) {
      // 이미 선택된 태그인 경우, 해당 태그를 제거
      setSelectedStyle((prev) =>
        prev.filter((selectedTag) => selectedTag.hairStyleSeq !== tag.hairStyleSeq)
      );
    } else {
      // 선택되지 않은 태그인 경우, 해당 태그를 추가
      setSelectedStyle((prev) => [...prev, selectedTag]);
    }
  };
  // DesignerList에서 사용할 정렬 기준을 상태로 관리
  const [sortOrder, setSortOrder] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null); // 초기 상태는 아무 버튼도 선택되지 않은 상태로 설정
  
  // 정렬 기준 바꾸는 함수
  const handleSortClick = (btnName) => {
    if (sortOrder === btnName) {
      setSortOrder(null); // 버튼 해제시 정렬 기준을 null로 설정
    } else {
      setSortOrder(btnName); // 버튼 클릭시 해당 버튼명을 정렬 기준으로 설정
    }
  };
  const handleBtnClick = async (btnName) => {
    await handleSortClick(btnName); // 버튼을 클릭하면 정렬 기준이 변경되도록 함
    setActiveBtn(btnName); // 클릭한 버튼을 활성화 상태로 변경
};
  const [handleMap, setHandleMap] = useState(false);
  const toggleMap = () => {
    setHandleMap((prev) => !prev);
  };

  // 스타일 필터 제출 통신
  const submitFilter = async(seq) => {
    try {
      const hairStyleSeqNumbers = selectedStyle.map((tag) => tag.hairStyleSeq);
      const filterData = await submitStyleFilter(hairStyleSeqNumbers);  
      setFilterData(filterData)
      console.log(filterData.designerListCnt)
    }catch(error){
      console.log(error)
    }
  };

  return (
    <Container>
      { sendData ? (
      <>
      <Box>
        <SearchBox>
          <SearchImg src="/icon/search.png"/>
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
            >#{tag.hairStyleLabel}
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
          >#{tag.hairStyleLabel}
          </HashTag>
          ))}
        </SelectBox>
          <SelectedText>선택</SelectedText>
          <SelectedBox>
            {selectedStyle.map((tag) => (
            <SelectTag
              key={tag.hairStyleSeq}
              onClick={(e) => {e.stopPropagation(); toggleStyleType(tag);}}
              selected={selectedStyle.some(
                (selectedTag) => selectedTag.hairStyleSeq === tag.hairStyleSeq
              )}
              >#{tag.hairStyleLabel}
            </SelectTag>
              ))}
              <SubmitBtn onClick={submitFilter}>조회</SubmitBtn>
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
          onClick={() => {handleSortClick('좋아요순'); handleBtnClick('좋아요순')}}
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
          <DesignerList data={sendData} sortOrder={sortOrder} />
        </>
        ) : (
        <p>...loading</p>
  )}
  </Container>
)};
export default ListView;