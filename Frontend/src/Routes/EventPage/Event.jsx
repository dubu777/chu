// 여기는 이벤트 페이지(선진)

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { getEventInfo, postEventInfo, postInputImage, postTargetImage } from "../../apis/event";

const Marginbox = styled.div`
    height: 100px;
`
const Container = styled.div`
    background-image: url('/img/password.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    justify-content: space-around;
    align-items: center;
`;
const MainWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    /* filter: invert(7%); */
`;
const Imgbox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const P = styled.p`
	text-align: right;
	margin-right: 10px;
	margin-bottom: 5px;
`;
const Text = styled.p`
	margin-top: 10px;
`;

const Borderbox = styled.div`
	border: dashed 2px;
	border-color: #696865da;
	margin: 20px;
    padding: 20px;
	border-radius: 0.5rem;
`;

const Box = styled.div`
    /* width: 22%; */
	height: 350px;
	background-color:rgba(246, 243, 228, 0.708);
	/* margin: auto; */
    margin: 20px;
	border-radius: 0.6rem;
`;
const Input = styled.input`
	font-family: "Blue-road";
	margin: 0px 10px 10px 30px;
`;

const DefaultImg = styled.img`
	width: 50px;
	height: 50px;
	margin-top: 20%;
	margin-bottom: 10px;
`;
const TextBtn = styled.button`
	border: 0;
	height: 35px;
    font-size: 14px;
	width: 130px;
	border-radius: 0.8rem;
	background-color: #f6be4e;
`;
const Img = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 0.4rem;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
`;
const ClickBtn = styled.button`
    font-size: 18px;
    border: 2.5px solid #5d594d;
    border-radius: 2rem;
    background-color: white;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 10px 20px;
    cursor: pointer;
    :hover {
        background-color: #9a968b;
        color: white;
    }
`;
const ResultBox = styled.div`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubmitImg = styled.input`
  margin: 15px 0px;
`;
const SText = styled.span`
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
`;
const Profile = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${(props) => (props.hasFile ? "lightblue" : "transparent")};
  cursor: pointer;
`;

function Event() {

    const customerSeq = localStorage.getItem('userSeq');
    // const [inputImagePath, setInputImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/user.png`);
    // const [targetImagePath, setTargetImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png`);
    // const [confusionImagePath, setConfusionImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png`);

    const [inputImagePath, setInputImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/user.png`);
    const [targetImagePath, setTargetImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png`);
    const [confusionImagePath, setConfusionImagePath] = useState('/icon/who1.png');

    const [inputImageFile, setInputImageFile] = useState(null);
    const [targetImageFile, setTargetImageFile] = useState(null);
    const [responseState, setResponseState] = useState(null);

    const formData = new FormData();

    const getInfo = async (customerSeq) => {
        try {
            const response = await getEventInfo(customerSeq);
            console.log(response);
            setResponseState(response.state);
            // 처음 페이지에 들어온거야 아직 아무것도 한 게 없음
            if (response.state == 0) {
                console.log("0 처리 잘 하네~.~");
            }
            // 입력 이미지는 서버랑 통신한 상태
            else if (response.state == 1) {
                setInputImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.inputImgPath}`);
            }
            // 타겟 이미지까지 서버랑 통신한 상태
            else if (response.state == 2) {
                setInputImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.inputImgPath}`);
                setTargetImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/${response.targetImgPath}`);
            }
            // 버튼 누르고 대기 상태
            else if (response.state == 3) {
                setInputImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.inputImgPath}`);
                setTargetImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/${response.targetImgPath}`);
            }
            // 사진 완성 상태
            else if (response.state == 4) {
                setInputImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.inputImgPath}`);
                setTargetImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/${response.targetImgPath}`);
                setConfusionImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/confusion/${response.confusionImgPath}`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // goToConfusionWolrd 함수 내에서 formData 생성
    const goToConfusionWolrd = (customerSeq) => {
        try {
            const response = postEventInfo(customerSeq);
            console.log(response);
            alert("사진이 만들어지는 동안 대기해주세요~");
            setResponseState(3);
        } catch (error) {
            console.log(error);
        }
    };

    // 입력 이미지 첨부
    const handleInputImageChange = async (event) => {
        const file = event.target.files[0];
        console.log(file); // 파일 객체 확인
        setInputImageFile(file); // 상태로 파일 저장
        const formData = new FormData();
        formData.append("img", file);
        const response = await postInputImage(customerSeq, formData);
        setResponseState(1);
        // 입력 이미지 미리보기
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputImagePath(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // 타겟 이미지 첨부
    const handleTargetImageChange = async (event) => {
        const file = event.target.files[0];
        console.log(file); // 파일 객체 확인
        setTargetImageFile(file); // 상태로 파일 저장
        const formData = new FormData();
        formData.append("img", file);
        const response = await postTargetImage(customerSeq, formData);
        setResponseState(2);
        // 타겟 이미지 미리보기
        const reader = new FileReader();
        reader.onloadend = () => {
            setTargetImagePath(reader.result);
        };
        reader.readAsDataURL(file);
    };
    function handleFileRemoveButton(){
        // 파일 선택을 초기화
        document.getElementById('file').value = '';
        setInputImageFile(null);
        setInputImagePath(null);
            // setFileName('');
      };
    useEffect(() => {
        getInfo(customerSeq);
    }, [customerSeq]);

    return (
        <Container>
            <MainWrapper>
            <Marginbox />
              <ResultBox>
            {
                // 상태가 2라는건 타겟이미지가 넘어갔다는 것, 입력 이미지도 넣었다는 것
                responseState == 2 && setInputImagePath != `https://i9b111.q.ssafy.io/api/customer-profile/event/origin/user.png`
                    ? (
                        <>
                            <Img
                                src={confusionImagePath}
                                alt="Profile"
                            />
                            <ClickBtn onClick={() => goToConfusionWolrd(customerSeq, formData)}>한장한장 체험하기👆🏻</ClickBtn>
                            <SText>버튼을 누르면 합성사진 체험이 가능합니다 :)</SText>
                        </>
                    )
                    : (
                        <div></div>
                    )
            }
            
            {
                // 상태가 3이라면 로딩중이라는 것
                responseState == 3
                    ? (
                        <>
                            <SText>로딩중입니다!</SText>
                            <Img
                                src={confusionImagePath}
                                alt="Profile"
                            />
                        </>
                    )
                    : (
                        <div></div>
                    )
            }

            {
                // 상태가 4 합성 이미지 불러오기 성공이라는 것
                responseState == 4
                    ? (
                        <>
                            <SText>성공!</SText>
                            <Profile
                                src={confusionImagePath}
                                alt="Profile"
                            />
                        </>
                    )
                    : (
                        <div></div>
                    )
            }
            </ResultBox>
            
            <Wrapper>
            <ImgWrapper>
            <Box>
        	{inputImagePath ? ( // 파일 미리보기가 있을 경우에만 보여주기
        	<Imgbox>
				<br />
				<Borderbox>
          			<Img 
                    src={inputImagePath}
                    alt="Profile"
                    />
				</Borderbox>
                <Input 
                    type="file"
                    accept="image/*"
                    onChange={handleInputImageChange}
                    />
        	</Imgbox>
				) : (
					/* 파일 이미지가 없을 때 */
					<Imgbox>
						<DefaultImg src="/icon/file.png"></DefaultImg>
						<Text>이마가 보이는 사진을 업로드해 주세요 :)</Text>
					</Imgbox>
      	        )}      
				</Box>
            <Imgbox>
                <TextBtn>얼굴 이미지</TextBtn>
            </Imgbox>
        </ImgWrapper>
{/* 타겟 이미지 */}
        <ImgWrapper>
            <Box>
        	{targetImagePath ? ( // 파일 미리보기가 있을 경우에만 보여주기
        	<Imgbox>
				<br />
				<Borderbox>
          			<Img 
                    src={targetImagePath}
                    alt="Profile"
                    />
				</Borderbox>
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={handleTargetImageChange}
                  />
        	</Imgbox>
				) : (
					/* 파일 이미지가 없을 때 */
					<Imgbox>
						<DefaultImg src="/icon/file.png"></DefaultImg>
						<Text>체험을 원하는 머리 사진을 업로드해 주세요.</Text>
					</Imgbox>
      	        )}      
				</Box>
                <Imgbox>
                    <TextBtn>헤어 이미지</TextBtn>
                </Imgbox>
            </ImgWrapper>
        </Wrapper>


  {/* 만약 */}
            {/* <Profile
                src={inputImagePath}
                alt="Profile"
            // hasFile={selectedFile !== null}
            />
            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleInputImageChange}
            />
            <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText> */}


            {/* <Profile
                src={targetImagePath}
                alt="Profile"
            // hasFile={selectedFile !== null}
            />
            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleTargetImageChange}
            />
            <SText>- 체험을 원하는 머리 사진을 업로드해 주세요.</SText> */}
            </MainWrapper>
        </Container>
    );
}

export default Event;