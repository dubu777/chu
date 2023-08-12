// 여기는 이벤트 페이지(선진)

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { getEventInfo } from "../../apis/event";

const Container = styled.div`
    margin: 40px;
`;

function Event() {

    const customerSeq = localStorage.getItem('userSeq');
    const [inputImagePath, setInputImagePath] = useState(null);
    const [targetImagePath, setTargetImagePath] = useState(null);
    const [confusionImagePath, setConfusionImagePath] = useState(null);

    const [inputImageFile, setInputImageFile] = useState(null);
    const [targetImageFile, setTargetImageFile] = useState(null);

    const getInfo = async (customerSeq) => {
        try {
            const response = await getEventInfo(customerSeq);
            console.log(response);
            if (response.data.result == null) {
                console.log("null 처리 잘 하네~.~");
            }
            else {
                setInputImagePath(response.data.result.inputImgPath);
                setOutputImagePath(response.data.result.targetImgPath);
                if (response.confusionImgPath != null) {
                    setConfusionImagePath(response.data.result.confusionImgPath);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 입력 이미지 첨부
    const handleInputImageChange = (event) => {
        // const file = event.target.files[0];
        // setSelectedFile(file);
        const file = event.target.files[0];
        // 사진만 넣는 로직으로 바꿔야함
        setInputImageFile(file);
    };

            // 입력 이미지 첨부
    const handleTargetImageChange = (event) => {
        // const file = event.target.files[0];
        // setSelectedFile(file);
        const file = event.target.files[0];
        // 사진만 넣는 로직으로 바꿔야함
        setTargetImageFile(file);
    };


    useEffect(() => {
        getInfo(customerSeq);
    }, [customerSeq]);

    return (
        <Container>
            <p>여기는 추가 기능 이벤트 페이지</p>
            <p>파이팅🔥</p>
        </Container>
    );
}

export default Event;