// 디자이너의 상담 예약 리스트 컴포넌트

import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sessionIdState } from "../../recoil/openvidu";
import { useQuery } from "react-query";
import { getAllReserveList } from "../../apis"
import { getSessionId } from "../../apis/openvidu"
import { BASE_URL } from "../../apis/rootUrl";
import { createNotification, getCustomerMyPage, reservationCancel } from "../../apis";
import Swal from 'sweetalert2';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* width: 65vw; */
  /* margin: 0 auto; */
  padding-top: 30px;
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
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
  padding: 20px;
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
  width: 60px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 15px;
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
  background-color: #e5e3dc;
  width: 120px;
  height: 32px;
  border-radius: 0.2rem;
  color: black;
`;
const ModalBtn = styled.button`
  border: 0;
  background-color: #605b52;
  width: 120px;
  height: 32px;
  border-radius: 0.2rem;
  color: white;
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 550px;
  /* height: 300px; */
  padding: 20px 40px;
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
const Loading = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const P = styled.p`
  font-size: 23px;
`;
const PofolImg = styled(motion.img)`
  width: 100px;
  /* height: 125px; */
  border-radius: 5px;
  object-fit: cover;
`;

const StyledSlider = styled(Slider)`
  
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
    height: 100%;
  }
  .slick-prev {
    z-index: 1;
    left: -26px;
  }

  .slick-next {
    right: -23px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.5;
    color: #a1a1a1;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: -13px;

    li button:before {
      color: #acaaa9;
    }

    li.slick-active button:before {
      color: #353535;
    }
  }
`;
const Loading_spinner_box = styled.div`
  margin-left: 3px;
  width: 11px;
  height: 11px;
  border: 1.5px solid $gray-4;
  border-top: 1.5px solid $gray-10;
  border-radius: 50%;

  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  @-webkit-keyframes spin {
                0% {
                  -webkit-transform: rotate(0deg);
                }
                100% {
                  -webkit-transform: rotate(360deg);
                }
              }

              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
`;
const pofolVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};


function AllReserveList() {
  const navigate = useNavigate();
  const { designerSeq } = useParams();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const userType = localStorage.getItem('userType')
  const openModal = (item) => {    // 모달 열기
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {  // 모달 닫기
    setIsModalOpen(false);
  };

  // sessoionId API 호출
  // const consultSeq = 1;
  const moveToWrapper = (consultingSeq) => {
      navigate(`/viduroom/${consultingSeq}`);
  }
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const getSession = async (consultSeq) => {
  //   console.log('여기 왔다1', consultSeq);
  //   try {
  //     const response = await getSessionId(consultSeq);
  //     console.log('가져왔다', response);
  //     setSessionId(consultSeq);

  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  // useEffect(() => {
  //   if (sessionId) {
  //     console.log("나이거보내고싶어", sessionId);
  //     navigate(`/viduroom/${sessionId}`);
  //   }
  // }, [sessionId]);
  const handleCancel = async (consultingSeq) => {
    try {
      const result = await Swal.fire({
        title: '상담을 취소하시겠습니까?',
        text: "취소한 상담은 복구할 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요'
      });
  
      // '네' 버튼을 눌렀을 경우에만 로직을 실행
      if (result.isConfirmed) {
        // 알림 생성
        const notificationResult = await createNotification(consultingSeq, userType);
        console.log(notificationResult, "알림생성");
    
        // 상담 취소
        const reservationResult = await reservationCancel(consultingSeq);
        console.log(reservationResult, "상담취소");
        refetch();
      }
      } catch (error) {
        console.error("API 호출 실패", error);
      }
    
  }
  const { data, isError, isLoading, refetch } = useQuery(
    ['allReserveList', designerSeq],
    () => getAllReserveList(designerSeq)
  );
  console.log('디자이너 상담 예약 관리', data)

  if (isLoading) {
    return <div>Loading...{data}</div>;
  }
  if (isError) {
    return <div>홈 페이지 에러{data}</div>;
  }

  return (
    <Container>
      { data ? (
      <>
      <Wrap>
        <Wrapper>
        {data.filter(item => !item.cancelDate).map((item) => (
            <ReserveBox key={item.consultingSeq}>
              <Box>
                {/* <CustomerImg src="./icon/user.png"/> */}
                <CustomerImg src={`${BASE_URL}/consulting-images/origin/${item.originImg}`} />
              </Box>
              <Box>
                <Name>{item.name} </Name>
              </Box>
              <Box>
                <Text>{item.gender === "F" ? "여성" : "남성"}</Text>
              </Box>
              <Box>
                <Text>{item.consultingDate} {item.time}</Text>
              </Box>
              <Box>
                <ModalBtn onClick={() => openModal(item)}>상세 보기</ModalBtn>
              </Box>
              <Box>
                <ModalBtn onClick={() => moveToWrapper(item.consultingSeq)}>
                  {/* <Link to={{ pathname: '/viduroom', state: { sessionData: 'sessionId' } }}>상담 입장</Link> */}
                  상담입장</ModalBtn>
              </Box>
              <Box>
                <EnterBtn onClick={() => handleCancel(item.consultingSeq)}>상담 취소</EnterBtn>
              </Box>
              {/* 모달 */}
              {isModalOpen && selectedItem && (
                <Modal>
                  <ModalContent>
                    {/* 여기에 모달에 표시할 내용을 추가 */}
                    <div>
                      <StyledSlider {...settings}>
                      {selectedItem.virtualImg.map((img, index) => (
                  <PofolImg
                  key={index} src={`${BASE_URL}/consulting-images/confusion/${img}`}
                    variants={pofolVariants}
                    initial="nomal"
                    whileHover="hover"
                  />
                ))}
              </StyledSlider>
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
      </>
        ) : (
          <Loading>
            <Loading_spinner_box>
              <loading_spinner/>
            </Loading_spinner_box>
            <P>...loading</P>
          </Loading>
        
  )}
    </Container>

  );
}

export default AllReserveList;