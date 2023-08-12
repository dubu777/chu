// 여기는 이벤트 페이지(선진)

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { getEventInfo, postEventInfo } from "../../apis/event";

const Container = styled.div`
    margin: 40px;
`;
const SubmitImg = styled.input`
  margin: 15px 0px;
`;
const SText = styled.span`
  font-size: 10px;
  font-weight: 600;
  display: flex;
  justify-content: start;
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
    const [inputImagePath, setInputImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/user.png`);
    const [targetImagePath, setTargetImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png`);
    const [confusionImagePath, setConfusionImagePath] = useState(`https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png`);

    const [inputImageFile, setInputImageFile] = useState(null);
    const [targetImageFile, setTargetImageFile] = useState(null);

    const formData = new FormData();

    const getInfo = async (customerSeq) => {
        try {
            const response = await getEventInfo(customerSeq);
            console.log(response);
            if (response.state == 0) {
                console.log("0 처리 잘 하네~.~");
            }
            else {
                setInputImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.inputImgPath}`);
                setTargetImagePath(`https://i9b111.q.ssafy.io/api/customer-profile/event/origin/${response.targetImagePath}`);
                if (response.confusionImgPath != null) {
                    setConfusionImagePath(response.confusionImgPath);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // goToConfusionWolrd 함수 내에서 formData 생성
    const goToConfusionWolrd = async (customerSeq) => {
        const formData = new FormData();
        formData.append("inputImg", inputImageFile);
        formData.append("targetImg", targetImageFile);

        // FormData 내용 확인
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const response = await postEventInfo(customerSeq, formData);
            console.log(response);
            alert("사진이 만들어지는 동안 대기해주세요~");
        } catch (error) {
            console.log(error);
        }
    };

    // 입력 이미지 첨부
    const handleInputImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file); // 파일 객체 확인
        setInputImageFile(file); // 상태로 파일 저장
        // 입력 이미지 미리보기
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputImagePath(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // 타겟 이미지 첨부
    const handleTargetImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file); // 파일 객체 확인
        setTargetImageFile(file); // 상태로 파일 저장
        // 타겟 이미지 미리보기
        const reader = new FileReader();
        reader.onloadend = () => {
            setTargetImagePath(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        getInfo(customerSeq);
    }, [customerSeq]);

    return (
        <Container>
            <p>여기는 추가 기능 이벤트 페이지</p>
            <p>파이팅🔥</p>

            {/* 만약  */}
            <Profile
                src={inputImagePath}
                alt="Profile"
            // hasFile={selectedFile !== null}
            />
            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleInputImageChange}
            />
            <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>

            <Profile
                src={targetImagePath}
                alt="Profile"
            // hasFile={selectedFile !== null}
            />
            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleTargetImageChange}
            />

            <SText>- 체험을 원하는 머리 사진을 업로드해 주세요.</SText>



            {
                confusionImagePath === 'https://i9b111.q.ssafy.io/api/customer-profile/event/target/user.png'
                    ? (
                        <>
                            <button onClick={() => goToConfusionWolrd(customerSeq, formData)}>체험해보기!</button>
                            <SText>로딩중입니다.</SText>
                            <Profile
                                src={confusionImagePath}
                                alt="Profile"
                            />
                        </>
                    )
                    : (
                        <>
                            <SText>성공!</SText>
                            <Profile
                                src={confusionImagePath}
                                alt="Profile"
                            />
                        </>
                    )
            }

        </Container>
    );
}

export default Event;