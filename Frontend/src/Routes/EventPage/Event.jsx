// 여기는 이벤트 페이지(선진)

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { getEventInfo } from "../../apis/event";

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

function Event() {

    const customerSeq = localStorage.getItem('userSeq');
    const [inputImagePath, setInputImagePath] = useState(null);
    const [targetImagePath, setTargetImagePath] = useState(null);
    const [confusionImagePath, setConfusionImagePath] = useState(null);

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
                setInputImagePath(response.inputImgPath);
                setTargetImagePath(response.targetImgPath);
                if (response.confusionImgPath != null) {
                    setConfusionImagePath(response.confusionImgPath);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


// 입력 이미지 첨부
const handleInputImageChange = (event) => {
    const file = event.target.files[0];
    formData.append("inputImg", file); // "inputImg" 키 사용
    setInputImageFile(file);
  };
  
  // 타겟 이미지 첨부
  const handleTargetImageChange = (event) => {
    const file = event.target.files[0];
    formData.append("targetImg", file); // "targetImg" 키 사용
    setTargetImageFile(file);
  };


    useEffect(() => {
        getInfo(customerSeq);
    }, [customerSeq]);

    return (
        <Container>
            <p>여기는 추가 기능 이벤트 페이지</p>
            <p>파이팅🔥</p>

            {/* 만약  */}

            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleInputImageChange}
            />
            <SText>- 이마가 보이는 사진을 업로드해 주세요.</SText>
            <SubmitImg
                type="file"
                accept="image/*"
                onChange={handleTargetImageChange}
            />
            <SText>- 체험을 원하는 머리 사진을 업로드해 주세요.</SText>
        </Container>
    );
}

export default Event;