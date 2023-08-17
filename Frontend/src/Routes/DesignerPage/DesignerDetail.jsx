import { styled } from "styled-components";
import "react-calendar/dist/Calendar.css"; // css import
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { loginResultState, loginState } from "../../recoil/auth";
import { useRecoilState } from "recoil";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getDesignerDetail } from "../../apis/designer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from '../../apis/rootUrl';
import { toggleLikeButton } from "../../apis";
import Swal from 'sweetalert2';

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(146, 132, 104, 0.07);
`;

const TitleText = styled.span`
  font-family: 'Abril Fatface';
  font-size: 40px;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  margin: 20px 0;
  border-radius: 10px;
  padding: 30px 20px;
  background-color: white;
  /* box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 30px -4px rgb(0 0 0 / 0.1); */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DesignerInfoBox = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
`;
const DesignerImgBox = styled.div`
  width: 180px;
  height: 180px;
  margin-right: 10px;
  margin-left: 5px;
  border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
  overflow: hidden;
`;
const DesignerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DesignerNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
`;
const DesignerNameBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const DesignerName = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  
`;
const LikeBox = styled.div`
  display: flex;
  margin-right:100px;
  align-items: center;
  padding: 5px 10px;
  // border: 2px solid rgb(244, 153, 26);
  border-radius: 5px;
`;
const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const ReviewText = styled(Text)`
  font-size:15px;
  margin: 5px 10px 7px 3px;
`
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 3px;
  justify-content: space-between;
`;
const CostIcon = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 3px;
`;
const GpsIcon = styled.img`
  width: 24px;
  height: 24px;
`
const AddressBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
`
const Hr = styled.div`
  /* color: #383838; */
  border: 1px solid rgb(197, 197, 197);
  width: 97%;
  margin-bottom: 10px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom:10px;
`;
const Address = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #4a4848;
  margin: 5px;
`;
const HashBox = styled.div`
  display: flex;
  margin-left: 5px;
`;
const HashTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: rgb(227, 208, 173);
  border-radius: 5px;
  margin-top: 3px;
`;
const IntroTextArea = styled.span`
  padding: 20px 20px 20px 20px;
  background-color: rgb(248, 245, 240);
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 10px;
  width: 100%;
`;
const PofolWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const SubTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  font-family: 'Apple-B'; 
  margin-top: 10px;
  margin-bottom: 5px;
`;
const PofolImg = styled(motion.img)`
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.2rem;
`;
const ReviewWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const ReviewInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewIdBox = styled.div`
  font-size: 15px;
  font-weight: 500;
`;
const ReviewDate = styled.span`
  margin-left: 20px;
  color: gray;
`
const SIcon = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 5px;
`;
const LikeBtn = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
`;
const ReservBox = styled(motion.div)`
  width: 50%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  margin-left: 30px;
  margin-right: 5px;
  cursor: pointer;
`;
const ReviewInfoDetailBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
`
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

function DesignerDetail() {
  const navigate = useNavigate();
  const customerSeq = localStorage.getItem("userSeq")
    ? localStorage.getItem("userSeq")
    : 0;
  const queryClient = useQueryClient();

  //designerList를 키로 가진 query를 무효화 하여 새로운 데이터를 받아오게함
  const mutation = useMutation(toggleLikeButton, {
    onSuccess: () => {
      queryClient.invalidateQueries("designerDetail");
    },
  });

  const handleLikeClick = (designerSeq, currentLikeStatus) => {
    if (userType !== 'customer') {
      return;
    }
    const newLikeStatus = !currentLikeStatus;
    mutation.mutate({ designerSeq, customerSeq, isLike: newLikeStatus });
  };

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipeToSlide: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const usertype = localStorage.getItem('userType');

  const hours = Array.from({ length: 14 }, (_, index) => index + 9);
  const minutes = ["00", "30"];

  const timeSlots = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      const time = `${hour.toString().padStart(2, "0")}${minute}`;
      timeSlots.push(time);
    });
  });

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };
  const { designerSeq } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["designerDetail", designerSeq, customerSeq],
    () => getDesignerDetail(designerSeq, customerSeq)
  );
  const userType = localStorage.getItem('userType')
  console.log('디테일 데이터', data)

  const handleReservBoxClick = () => {
    if (userType === 'designer') {
      Swal.fire({
        title: '알림',
        text: '예약서비스는 일반회원 전용 기능입니다.',
        icon: 'info',
        confirmButtonText: '확인'
      });
    } else if (!userType) {
      Swal.fire({
        title: '알림',
        text: '예약 서비스는 로그인 후 이용 가능합니다.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '로그인 하러가기',
        cancelButtonText: '현재 페이지로 돌아가기'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');  // 로그인 페이지의 경로로 변경하세요.
        }
      });
    } else {
      navigate(`/reservation/${designerSeq}`);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading designer details</div>;

  return (
    <Container>
      <TitleText>
        Designer Detail
      </TitleText>
      <Wrapper>
        <Wrap>
          <InfoWrapper>
            <DesignerInfoBox>
            <DesignerImgBox>
            <DesignerImg src={`${BASE_URL}/designer-profile/${data.designerImg}`}/>
            </DesignerImgBox>
              <DesignerNameWrap>
                <DesignerNameBox>
                  <DesignerName>{data.name} 디자이너</DesignerName>
                  { userType === 'customer' ?
                  
                  <LikeBox isLike={data.isLike}>
                    {data.isLike ? (
                      // 좋아요가 눌려있을 때 빨간색 하트 아이콘
                      <LikeBtn
                        src="/icon/hearto.png"
                        onClick={() =>
                          handleLikeClick(data.designerSeq, data.isLike)
                        }
                      />
                    ) : (
                      // 좋아요가 눌려있지 않을 때 빈 하트 아이콘
                      <LikeBtn
                        src="/icon/heartx.png"
                        onClick={() =>
                          handleLikeClick(data.designerSeq, data.isLike)
                        }
                      />
                    )}
                    <Text>{data.likeCnt}</Text>
                  </LikeBox> : <LikeBtn
                        src="/icon/heartx.png"
                        onClick={() =>
                          handleLikeClick(data.designerSeq, data.isLike)
                        }
                      />
                  }
                </DesignerNameBox>
                <Hr />
                <Box>
                  <Box>
                    <CostIcon src="/icon/money.png" />
                    <Text>{data.cost}</Text>
                  </Box>
                  {/* 회원유형에 따라 예약버튼 활성화 */}

                  <ReservBox
                    onClick={handleReservBoxClick}
                    whileHover={{ backgroundColor: "rgb(244,153,26)" }}
                  >
                    {/* <Icon src="/icon/reservBtn.png" /> */}
                    <Text>상담 예약하기</Text>
                  </ReservBox>
                </Box>
              </DesignerNameWrap>
            </DesignerInfoBox>
            <InfoBox>
              <AddressBox>
                <GpsIcon src="/icon/gps_pin_icon.png" />
                <Address>{data.salonName}</Address>
              </AddressBox>
              <HashBox>
                {data.hairStyleLabel.map((tag, index) => (
                  <HashTag key={index}>#{tag}</HashTag>
                ))}
              </HashBox>
              <IntroTextArea>{data.introduction}</IntroTextArea>
            </InfoBox>
          </InfoWrapper>
          <PofolWrap>
            <SubTitle>포트폴리오</SubTitle>
            <Hr />
            <StyledSlider {...settings}>
              {data.portfolio.map((item, index) => (
                <PofolImg
                  key={index}
                  // src={item}
                  src={`${BASE_URL}/portfolio/${item.imgName}`}
                  variants={pofolVariants}
                  initial="nomal"
                  whileHover="hover"
                />
              ))}
            </StyledSlider>
          </PofolWrap>
          <InfoBox>
            <SubTitle>별점</SubTitle>
            <Box>
              <Icon src="/icon/star.png" />
              <Text>{data.allReviewScore.toFixed(1)}</Text>
            </Box>
          </InfoBox>
          <InfoBox>
            <br/>
            <SubTitle>상담후기 ({data.review.length})</SubTitle>
            <Hr />
          </InfoBox>
          {data.review.map((review, index) => (
            <ReviewInfoBox key={index}>
              <ReviewWrap>
                <ReviewInfoDetailBox>
                  <Box>
                    <ReviewIdBox>{review.customerId}</ReviewIdBox>
                    <SIcon src="/icon/star.png" />
                    <Text>{review.reviewScore.toFixed(1)}</Text>
                  </Box>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewInfoDetailBox>
              </ReviewWrap>
              <ReviewText>{review.reviewContent}</ReviewText>
              <Hr />
            </ReviewInfoBox>
          ))}
        </Wrap>
      </Wrapper>
    </Container>
  );
}
export default DesignerDetail;
