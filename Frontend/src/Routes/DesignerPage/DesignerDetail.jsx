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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  margin: 40px 0;
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
`;
const DesignerImg = styled.img`
  width: 100px;
  margin-right: 10px;
`;
const DesignerNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
const DesignerNameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DesignerName = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin: 0 5px;
`;
const LikeBox = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  padding: 5px 10px;
  border: 2px solid rgb(244, 153, 26);
  border-radius: 5px;
  background-color: ${(props) =>
    props.isLike ? "rgba(244,153,26,0.43)" : "white"};
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;
const CostIcon = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 3px;
  margin-right: 5px;
`;
const Hr = styled.div`
  /* color: #383838; */
  border: 1px solid rgb(197, 197, 197);
  width: 100%;
  margin: 10px 0;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const Address = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: gray;
  margin: 5px 0 5px 5px;
`;
const HashBox = styled.div`
  display: flex;
`;
const HashTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: rgba(196, 192, 192, 0.5);
  border-radius: 5px;
  margin-top: 3px;
`;
const IntroTextArea = styled.span`
  padding: 20px 60px 20px 20px;
  background-color: rgb(248, 245, 240);
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 10px;
  width: 90%;
  height: 100px;
`;
const PofolWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 10px;
`;
const SubTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin: 8px 0;
`;
const PofolImg = styled(motion.img)`
  width: 120px;
  height: 150px;
`;
const ReviewWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewIdBox = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const SIcon = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 5px;
`;
const LikeBtn = styled.img`
  width: 27px;
  height: 27px;
  margin-right: 10px;
  cursor: pointer;
`;
const ReservBox = styled(motion.div)`
  width: 70px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(244, 153, 26);
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
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
    const newLikeStatus = !currentLikeStatus;
    mutation.mutate({ designerSeq, customerSeq, isLike: newLikeStatus });
  };
  const OPofolImgs = [
    "/img/opofol1.jpg",
    "/img/opofol2.jpg",
    "/img/opofol3.jpg",
    "/img/opofol4.jpg",
    "/img/opofol5.jpg",
    "/img/opofol6.jpg",
    "/img/opofol7.jpg",
    "/img/opofol8.jpg",
    "/img/opofol9.jpg",
  ];
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading designer details</div>;

  return (
    <Container>
      <Wrapper>
        <Wrap>
          <InfoWrapper>
            <DesignerInfoBox>
            <DesignerImg src={`${BASE_URL}/designer-profile/${data.designerImg}`}/>
              <DesignerNameWrap>
                <DesignerNameBox>
                  <DesignerName>{data.name} 디자이너</DesignerName>
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
                  </LikeBox>
                </DesignerNameBox>
                <Hr />
                <Box>
                  <Box>
                    <CostIcon src="/icon/money.png" />
                    <Text>{data.cost}</Text>
                  </Box>
                  <ReservBox
                    onClick={() => navigate(`/reservation/${designerSeq}`)}
                    whileHover={{ backgroundColor: "rgb(244,153,26)" }}
                  >
                    <Icon src="/icon/reservBtn.png" />
                    <Text>예약</Text>
                  </ReservBox>
                </Box>
              </DesignerNameWrap>
            </DesignerInfoBox>
            <InfoBox>
              <Address>{data.address}</Address>
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
              {OPofolImgs.map((item, index) => (
                <PofolImg
                  key={index}
                  src={item}
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
              <Text>{data.allReviewScore}</Text>
            </Box>
            <SubTitle>상담후기</SubTitle>
          </InfoBox>
          <Hr />
          {data.review.map((review, index) => (
            <ReviewInfoBox key={index}>
              <ReviewWrap>
                <ReviewInfoBox>
                  <Box>
                    <ReviewIdBox>{review.customerId}</ReviewIdBox>
                    <SIcon src="/icon/star.png" />
                    <Text>{review.review_score}</Text>
                  </Box>
                  <Text>{review.reviewContent}</Text>
                </ReviewInfoBox>
                <Text>{review.consulting_date}</Text>
              </ReviewWrap>
              <Hr />
            </ReviewInfoBox>
          ))}
        </Wrap>
      </Wrapper>
    </Container>
  );
}
export default DesignerDetail;
