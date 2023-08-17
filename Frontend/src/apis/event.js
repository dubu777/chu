import axios from "axios";

const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = 'http://localhost:9090/api';


// session ID get요청
export const getEventInfo = async (customerSeq) => {

    try {
        console.log("try접근")
        // const response = await axios.get(`${BASE_URL}/consulting/${consultingSeq}`)
        const response = await axios.get(`${BASE_URL}/event/${customerSeq}`)
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        throw new Error('가져오기 실패')
    }
};

export const postInputImage = async (customerSeq, formData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/event/inputImage/${customerSeq}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("성공");
        return response.data.result;
    } catch (error) {
        throw new Error("이벤트 등록 실패");
    }
}

export const postTargetImage = async (customerSeq, formData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/event/targetImage/${customerSeq}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("성공");
        return response.data.result;
    } catch (error) {
        throw new Error("이벤트 등록 실패");
    }
}


export const postEventInfo = async (customerSeq) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/event/${customerSeq}`,
        );
        console.log("성공");
        return response.data.result;
    } catch (error) {
        throw new Error("이벤트 등록 실패");
    }
}