// 여기는 고객 마이페이지
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
// import CustomerPageInfo from "../../components/CustomerComponent/CustomerPageInfo";
import ScheduleListImg from "../../components/CustomerComponent/ScheduleListImg";
import ReserveList from "../../components/CustomerComponent/ReserveList";
import LikeDesigner from "../../components/CustomerComponent/LikeDesigner";
// import ProfileImg from "../../components/CustomerComponent/ProfileImg";
import { Link, useNavigate, useParams, useMatch } from "react-router-dom";
import { formDataState } from "../../recoil";
import { attachCustomerImage, getCustomerMyPage, sendSurvey } from "../../apis";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { BASE_URL } from "../../apis/rootUrl";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import swal from "sweetalert";
import { useInView } from "react-intersection-observer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div``;
// 고정 프로필바
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #f8f1d9;
  height: 300px;
`;
const ImgBox = styled.div`
  text-align: center;
  margin-top: 110px;
`;

const NameText = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;
const Text = styled.p`
  margin-bottom: 20px;
  font-size: large;
`;
const HashTag = styled.button`
  border: 0;
  border-radius: 0.3rem;
  background-color: #78756c;
  color: white;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 2px 15px;
`;
const InfoBox = styled.div`
  width: 30%;
  margin-top: 190px;
  margin-left: -120px;
`;
const ChangeBox = styled.div`
  width: 30%;
  margin-top: 220px;
  text-align: right;
`;

const ChangeBtn = styled(motion.button)`
  border: 0;
  border-radius: 0.4rem;
  background-color: #f9bd4f;
  width: 150px;
  font-weight: 600;
  color: #272626;
  height: 35px;
`;
// const ReserveWrapper = styled.div`
//   display: flex;
//   border: 2px solid gray;
//   margin: 160px auto 50px auto;
//   width: 60%;
//   border-radius: 0.7rem;
//   background-color: #f9f5f0;
//   padding: 10px 0;
// `;

const Wrapper = styled(motion.div)`
  width: 60%;
  margin: 30px auto 10px auto;
`;

const Box = styled(motion.div)`
  border: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #f9f5f0;
  margin-bottom: 20px;
  padding-bottom: 30px;
`;

const ClickBtn = styled.button`
  height: 40px;
  padding: 0px 15px;
  border-bottom-color: white;
  border: 2px solid white;
  background-color: ${({ isActive }) => (isActive ? "#F9F5F0" : "#F2EAD3")};
  border-left-color: ${({ isActive }) => (isActive ? "#645D51" : "#F2EAD3")};
  border-top-color: ${({ isActive }) => (isActive ? "#645D51" : "#F2EAD3")};
  border-right-color: ${({ isActive }) => (isActive ? "#645D51" : "#F2EAD3")};
  border-radius: 0.6rem 0.6rem 0rem 0rem;
`;
const Profile = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${(props) => (props.hasFile ? "lightblue" : "transparent")};
  cursor: pointer;
`;
const Btn = styled(motion.button)`
  background-color: rgb(242, 234, 211);
  color: black;
  padding: 10px 55px;
  border: 0;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(244, 153, 26);
    color: #f7f5e1;
  }
`;

const boxVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
};
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /* opacity: 0; */
`;
const BigModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 71vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
`;
const ModalText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const LikeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.handleLike ? "rgb(242,234,211)" : "white"};
  padding: 7px 15px;
  border: 2px solid rgb(247, 181, 88);
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const ModalHr = styled.div`
  margin-top: 10px;
  border-bottom: 2px solid rgb(214, 212, 212);
`;
const LikeBtnText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
    cursor: pointer;
  }
`;
const ReviewInput = styled.textarea`
  background-color: rgb(249, 245, 240);
  border: 0;
  border-radius: 10px;
  width: 80%;
  height: 200px;
  margin-top: 20px;
  padding: 10px;
  resize: none;
  outline: none;
  &:focus {
    border: 2px solid rgb(244, 153, 26);
    + span {
      color: rgb(244, 153, 26);
    }
  }
`;
const LikeBtn = styled.img`
  width: 27px;
  height: 27px;
  cursor: pointer;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 5px;
  align-items: center;
`;
const SubmitBtn = styled.button`
  width: 50px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  border: 0;
  border-radius: 5px;
  background-color: rgb(247, 181, 88);
`;
const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 50px;
  margin-top: 10px;
`;
const fromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};
function CustomerMyPage() {
  // 통신되면 열기
  const { customerSeq, consultingSeq } = useParams();
  console.log("커스터머 시퀀스", customerSeq);
  const { data, isLoading, isError } = useQuery(
    ["customerMyPage", customerSeq],
    () => getCustomerMyPage(customerSeq)
  );
  const [futureRef, futureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // 요소의 10%가 뷰포트에 들어왔을 때 애니메이션을 시작합니다.
  });
  const [postRef, postInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // 요소의 10%가 뷰포트에 들어왔을 때 애니메이션을 시작합니다.
  });
  // console.log(data);

  const [activeBtn, setActiveBtn] = useState("recent"); // 'recent' or 'designer'
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  // const [recodilFormData, setrecodilFormData] = useRecoilState(formDataState);
  // 사진을 클릭하면 파일 선택 다이얼로그를 나타내는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  // 파일을 선택했을 때 호출되는 이벤트 핸들러
  // onChange
  // const handleFileChange=(e)=>{
  //   e.preventDefault();
  //   const formData = new FormData();

  //   if(e.target.files){
  //     const uploadFile = e.target.files[0]
  //     formData.append('img',uploadFile)
  //     console.log(formData)
  //     setFile(uploadFile)
  //     console.log(uploadFile)
  //     console.log('===useState===')
  //     console.log(file)
  //   }
  // };

  // 이미지 등록 - API 맞춰서 수정해야함
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

    try {
      // 이미지를 서버에 업로드하고 imgSeq를 받아옴
      const response = await attachCustomerImage(customerSeq, formData);
      setSelectedFile(
        `https://i9b111.q.ssafy.io/api/customer-profile/${file.name}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnClick = (btnType) => {
    setActiveBtn(btnType);
  };
  // const handleSubmitImage = async(e) => {
  //   e.preventDefault();
  //   if (fileInputRef.current.files[0]) {
  //     const formData = new FormData();
  //     formData.append('img', fileInputRef.current.files[0]);
  //     for (const keyValue of formData) console.log(keyValue);

  //     try {
  //       const file = await attachCustomerImage(customerSeq, formData);
  //       console.log(file)
  //     } catch(error){
  //       console.log(error)
  //     }}
  //   };
  const { scrollY } = useScroll();
  const bigModalMatch = useMatch("/customermypage/:customerseq/:consultingseq");
  console.log(bigModalMatch, "모달 매치 데이터");

  // const onOverlayClick = () => {
  //   navigate("/customermypage/:customerseq");
  // };
  const MAX_RATE = 5; // 최대 점수
  const [currentRate, setCurrentRate] = useState(0);
  const [reviewContent, setReviewContent] = useState("");

  // 별 클릭 시 해당 별 이하의 점수를 반환하는 함수
  const handleStarClick = (rate) => {
    setCurrentRate(rate);
  };
  const [handleLike, setHandleLike] = useState(false); // 좋아요 상태를 state로 관리
  const toggleLike = () => {
    setHandleLike((prev) => !prev); // 좋아요 상태를 토글
  };
  const handleReviewChange = (e) => {
    setReviewContent(e.target.value);
  };
  const handleSubmit = async () => {
    if (currentRate === 0 || reviewContent.trim() === "") {
      swal("오류", "평점과 상담후기를 작성해주세요.", "error");
      return;
    }
    const formData = {
      consultingSeq: parseInt(consultingSeq, 10),
      isLike: handleLike,
      reviewScore: currentRate,
      reviewContent: reviewContent,
    };
    console.log(formData);
    try {
      const response = await sendSurvey(formData);
      if (response === 200) {
        console.log(response);
        swal("성공", "후기가 성공적으로 등록되었습니다.", "success");
        navigate(`/customermypage/${customerSeq}`);
      } else {
        swal("오류", "후기 등록 중 오류가 발생했습니다.", "error");
      }
    } catch (error) {
      swal("오류", "서버 에러입니다.", "error");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data.</div>;
  }

  // const file = event.target.files[0];
  // // 파일 타입이 image를 포함하는지 확인 후 객체 생성
  // if (file && file.type.includes('image')) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setSelectedFile(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // } else {   // 선택된 파일이 이미지 파일이 아닌 경우 alert 창 띄우기
  //   swal('⚠️ Image 파일 형식을 선택해주세요 :)');
  // }
  // };

  // const handleSubmitImage = async () => {
  //   if (selectedFile) {
  //     const formData = new FormData();  // 폼 데이터 생성
  //     // formData.append("img", fileInputRef.current.files[0]);
  //     formData.append("img", selectedFile);
  //     console.log("선택된 파일 접근")
  //   try {
  //     const response = await attachImage(customerSeq, formData);
  //     console.log(response);

  //   } catch(error){
  //     console.log(error);
  //     }
  //   }
  // };

  //   try {
  //     const response = await axios.patch(`http://localhost:9090/api/customer/detail/img/${customerSeq}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data' // 필요한 경우 헤더 설정
  //       },
  //     });
  //     console.log(response);
  //     // API 호출 결과 처리
  //   } catch (error) {
  //     console.log(error);
  //     // 에러 처리
  //   }
  // }
  console.log(data, "고객 마이페이지 데이터");
  return (
    <Container>
      {/* <CustomerPageInfo /> */}
      <InfoContainer>
        <InfoWrapper>
          <ImgBox>
            <NameText>{data.name}</NameText>
            <div>
              {/* 버튼을 클릭하면 파일 선택 다이얼로그를 나타내는 input 요소 */}
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              {/* 프로필 사진 or 연산자는 앞의 피연산자 기준*/}
              <Profile
                onClick={handleImageClick}
                // src={selectedFile || './icon/profile2.png'}
                // src={selectedFile || `${BASE_URL}/customer-profile/${data.img}`}
                src={selectedFile || `${BASE_URL}/customer-profile/${data.img}`}
                alt="Profile"
                // hasFile={selectedFile !== null}
              />
              {/* 이미지 제출 버튼 */}
              {/* <button onClick={handleSubmitImage}>사진 제출</button> */}
            </div>
          </ImgBox>
          <InfoBox>
            <Text>{data.id}</Text>
            <Text>{data.email}</Text>
            {data.hairCondition.map((word, index) => (
              <HashTag key={index}> #{word} </HashTag>
            ))}
          </InfoBox>
          <ChangeBox>
            <ChangeBtn
              onClick={() => navigate(`/editcustomerinfo/${customerSeq}`)}
              whileHover={{ backgroundColor: "#574934", color: "white" }}
            >
              회원 정보 변경
            </ChangeBtn>
          </ChangeBox>
        </InfoWrapper>
      </InfoContainer>
      {/* 예약 정보 확인하기 */}
      <ScheduleListImg
        initial="hidden"
        animate="visible"
        variants={fromBottom}
        transition={{ duration: 0.5 }}
      />
      {/* 여기는 탭 작동 */}
      <Wrapper
        initial="hidden"
        animate="visible"
        variants={fromBottom}
        transition={{ duration: 0.5, delay:0.5 }}
      >
        <ClickBtn
          isActive={activeBtn === "recent"}
          onClick={() => handleBtnClick("recent")}
        >
          최근 상담 내역
        </ClickBtn>
        <ClickBtn
          isActive={activeBtn === "designer"}
          onClick={() => handleBtnClick("designer")}
        >
          좋아요 한 디자이너
        </ClickBtn>
        <Box
          initial="hidden"
          animate="visible"
          variants={fromBottom}
          transition={{ duration: 0.5 }}
        >
          {/* 앞의 조건이 true일 때 뒤의 컴포넌트 보여주기 */}
          {activeBtn === "recent" && <ReserveList />}
          {activeBtn === "designer" && <LikeDesigner />}
        </Box>
      </Wrapper>
      <AnimatePresence>
        {bigModalMatch ? (
          <>
            <Overlay
              // onClick={onOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigModal style={{ top: scrollY.get() + 110 }} layoutId="1">
              <ModalBox>
                <ModalText>상담이 마음에 든다면,</ModalText>
                <LikeBtnBox onClick={toggleLike} handleLike={handleLike}>
                  <LikeBox>
                    {handleLike ? (
                      <LikeBtn src="/icon/hearto.png" />
                    ) : (
                      <LikeBtn src="/icon/heartx.png" />
                    )}
                  </LikeBox>
                  <LikeBtnText>이 디자이너 좋아요!</LikeBtnText>
                </LikeBtnBox>
                <ModalHr />
              </ModalBox>
              <ModalHr />
              <ModalBox>
                <ModalText>상담은 만족하셨나요?</ModalText>
                <StarRateWrap>
                  {Array.from({ length: MAX_RATE }, (_, idx) => idx + 1).map(
                    (rate) => (
                      <span
                        className="star_icon"
                        key={`star_${rate}`}
                        onClick={() => handleStarClick(rate)}
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="39"
                          viewBox="0 0 24 24"
                          fill={
                            rate <= currentRate
                              ? "rgb(246, 215, 15)"
                              : "#cacaca"
                          }
                        >
                          <path d="M12 1l2.4 7.2h7.7l-5.7 4.2 2.4 7.2-6-4.5-6 4.5 2.4-7.2-5.7-4.2h7.7z" />
                        </motion.svg>
                      </span>
                    )
                  )}
                </StarRateWrap>
              </ModalBox>
              <ModalHr />
              <ModalBox>
                <ModalText>한 줄 후기를 남겨주세요:)</ModalText>
                <ReviewInput
                  placeholder="리뷰 작성하기"
                  value={reviewContent}
                  onChange={handleReviewChange}
                />
              </ModalBox>
              <SubmitBox>
                <SubmitBtn onClick={handleSubmit}>작성</SubmitBtn>
              </SubmitBox>
            </BigModal>
          </>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
export default CustomerMyPage;
