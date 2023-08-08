// 디자이너의 상담 예약 리스트 컴포넌트

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {getSessionId} from "../../apis/openvidu";
import { useRecoilState, useRecoilValue} from "recoil";
import {sessionIdState} from "../../recoil/openvidu";

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* width: 65vw; */
  /* margin: 0 auto; */
  padding-left: 40px;
  padding-right: 50px;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 70px 20px 0px 20px;
  margin-bottom: 10px;
`;
const ReserveBox = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid lightgray;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 0.4rem;
`;
const Hr = styled.div`
  /* margin: 20px 0 20px 0; */
  padding-top: 20px;
  border-bottom : 2px solid rgba(0, 0, 0, 0.1);
  width: 80%;
  
`;
const Wrap = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
`;
const Wrapper = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  
`;
const CustomerImg = styled.img`
  width: 40px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

const ImgBox = styled.div`
  display: flex;
  /* margin-right: 10px; */
`;
// 여기 실제 데이터 받아올 때 img태그로 변경하기
const VirtualImg = styled.img`
  width: 150px;
  height: 170px;
  text-align: center;
  background-color: #d1cdc2;
  color: white;
  margin-right: 10px;
`;
const HashTag = styled.span`
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #83807a;
  border-radius: 5px;
  margin-top:3px;
  color: white;
`;
const FaceTag = styled.span`
  font-size: 12px;
  padding: 4px 9px;
  margin-right: 5px;
  background-color: #fffffd;
  border: 2px solid #83807a;
  border-radius: 5px;
  margin-top:3px;
`;
const Text = styled.span`
  font-size: 14px;
  /* font-weight: bold; */
  text-align: center;
`;
const Memo = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 20%;
  min-height: 100px;
  border-radius: 0.2rem;
  background-color: #fcf7e7;
  padding: 10px;
`;
const EnterBtn = styled.button`
  border: 0;
  background-color: #83807a;
  width: 100px;
  height: 30px;
  border-radius: 0.3rem;
  color: white;
`;
const ModalBtn = styled.button`
  border: 0;
  background-color: #83807a;
  width: 100px;
  height: 30px;
  border-radius: 0.3rem;
  color: white;
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 500px;
  /* height: 300px; */
  padding: 20px;
  border-radius: 0.6rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const CloseDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const CloseButton = styled.button`
  border: 0;
  background-color: #ccc;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;
function AllReserveList(){
  const navigate = useNavigate();
  const [data, setdata] = useState({
        "consultingList" : [
            {
                "consultingSeq" : 1,
                "consultingDate" : "2023-07-19",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img1.png",
                "name" : "김싸피",
                "gender" : "남성",
                "faceLabel" : "계란형",
                "hairCondition" : [
                    "얇은 모발",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "./icon/woman.png",
                    "./icon/woman.png",
                    "./icon/woman.png"
                ],
                "time" : "14:00"
            },
            {
                "consultingSeq" : 2,
                "consultingDate" : "2023-07-20",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img2.png",
                "name" : "송싸피",
                "gender" : "여성",
                "faceLabel" : "사각턱",
                "hairCondition" : [
                    "탈모",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "img1.png",
                    "img2.png",
                    "img3.png"
                ],
                "time" : "10:00"
            },
        ] 
    })
    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sessionId, setSessionId] = useRecoilState(sessionIdState);

    const openModal = (item) => {    // 모달 열기
      setSelectedItem(item);
      setIsModalOpen(true);
    };

    const closeModal = () => {  // 모달 닫기
      setIsModalOpen(false);
    };

    // sessoionId API 호출
    const consultSeq = 2;
    const getSession = async () => {
    try {
      const response  = await getSessionId(consultSeq);
      console.log(response)
      setSessionId(response)

    } catch(error){
      console.log(error)
    }
  };

  const goViduRoom = () => {
     navigate('/viduroom', {state: {sessionId}});
    //  navigate(`/viduroom/${sessionId}`);
  };


  // useEffect(() => {   // consultSeq 변경에 따른 API get 함수 호출
  //   getSession();
  // }, []);


    return(
        <Container>
      <Wrap>
        <TitleBox>
          <Box></Box>
          <Box>예약자명</Box>
          <Box>성별</Box>
          <Box> 상담 일시 </Box>
          <Box>상세 보기</Box>
          <Box>상담 입장</Box>
        </TitleBox>
      <Wrapper>
      {data.consultingList.map((item) => (
                <ReserveBox key={item.consultingSeq}>
                      <Box>
                        <CustomerImg src="./icon/user.png"/>
                      </Box>
                      <Box>
                        <Name>{item.name} </Name>
                      </Box>
                      <Box>
                        <Text>{item.gender}</Text>
                      </Box>
                      <Box>
                        <Text>{item.consultingDate} {item.time}</Text>
                      </Box>
                      <Box> 
                        <ModalBtn onClick={()=>openModal(item)}>상세 보기</ModalBtn>
                      </Box>
                      <Box>
                        <EnterBtn onClick={()=>
                        {getSession()
                          goViduRoom()
                        }}>
                          {/* <Link to={{ pathname: '/viduroom', state: { sessionData: 'sessionId' } }}>상담 입장</Link> */}
                        상담입장</EnterBtn>
                      </Box>
                        {/* 모달 */}
      {isModalOpen && selectedItem && (
        <Modal>
          <ModalContent>
            {/* 여기에 모달에 표시할 내용을 추가 */}
            <div>
              <ImgBox>
                  {selectedItem.virtualImg.map((img, index) => (
                    <VirtualImg key={index} src={img}></VirtualImg>
                  ))}
              </ImgBox>
              <hr />
              <ul>
                {selectedItem.hairCondition.map((condition, index) => (
                  <HashTag key={index}>{condition}</HashTag>
                ))}<FaceTag>{selectedItem.faceLabel}</FaceTag>
              </ul>
              <Memo>{selectedItem.consultingMemo}</Memo>
            </div>
            <CloseDiv>
              <CloseButton onClick={closeModal}>닫기</CloseButton>
            </CloseDiv>
          </ModalContent>
        </Modal>
      )}
      </ReserveBox>
                
            ))}
      </Wrapper>
      </Wrap>
    </Container>

    )
}

export default AllReserveList;