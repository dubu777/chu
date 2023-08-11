import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import ViduRoom from "./ViduRoom";
import { loginResultState, loginState } from '../../recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from "react-query";
import { fetchMain } from "../../apis/common.js";
import { getSessionId } from "../../apis/openvidu"
import { TrySharp } from "@mui/icons-material";

function ViduRoomWrapper() {
    // const [isReady, setIsReady] = useState(false);
    // loginResultState에 담겨있는 로그인 회원 정보를 조회해온 뒤 사용(토큰)
    // 로그인 시에는 seq와 토큰만 들어옴
    // 회원 정보를 어디서 가져왕..? => home 에서의 useQuery~~~~

    // console.log('현재 고객의 타입!', data.userType);
    // console.log('현재 고객의 타입!', data.designerInfo);

    // recoil에서 꺼낼거
    // 이전 통신에서 recoil에 저장해놓을꺼야
    const { consultingSeq } = useParams();
    console.log("처음", consultingSeq);
    const id = '1';
    // const resultimgs = ['login.jpg', 'worldcup1.jpg', 'worldcup2.jpg', 'worldcup4.jpg', 'findid.jpg', 'listview.jpg', 'password.jpg', 'main.jpg'];
    const resultimgs = [];
    // const targetimgs = ['login.jpg', 'worldcup1.jpg', 'worldcup2.jpg', 'worldcup4.jpg', 'findid.jpg', 'listview.jpg', 'password.jpg', 'main.jpg'];
    const targetimgs = [];

    const [ttt, setttt] = useState(null);
    const [rrr, setrrr] = useState(null);

    // 따로 이미 갖고 있는 데이터
    const userSeq = localStorage.getItem("userSeq");
    const username = localStorage.getItem("userName");
    const usertype = localStorage.getItem("userType");

    // 통신 API 작성되면, recoil이나 query로 이미지 배열 받아오기
    const getSession = async (consultingSeq) => {
        console.log('여기 왔다', consultingSeq);
        try {
            const response = await getSessionId(consultingSeq);
            console.log('가져왔다', response);
            console.log("카겟카겟", response.targetHair)
            
            // 가져온 값 넣기
            setttt(response.targetHair);
            setrrr(response.confusionHair);

            console.log('ttttttttt', ttt)
            console.log('rrrrrrr', rrr)

            // setIsReady(true);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getSession(consultingSeq);
    }, [])

    // useEffect(() => {
    //     console.log('ttttttttt', ttt);
    //     console.log('rrrrrrr', rrr);
    //   }, [ttt, rrr]);


    return ttt && rrr ? <ViduRoom sessionId={id} userName={username} userType={usertype} resultimgs={rrr} targetimgs={ttt} /> : <div>Loading...</div>;
}

export default ViduRoomWrapper;