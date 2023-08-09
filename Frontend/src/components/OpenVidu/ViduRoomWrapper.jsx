import {React, useState} from "react";
import { useParams } from "react-router";
import ViduRoom from "./ViduRoom";
import { loginResultState, loginState } from '../../recoil/auth';
import { useRecoilState, useRecoilValue  } from 'recoil';
import { useQuery } from "react-query";
import { fetchMain } from "../../apis/common";

function ViduRoomWrapper() {
    // loginResultState에 담겨있는 로그인 회원 정보를 조회해온 뒤 사용(토큰)
    // 로그인 시에는 seq와 토큰만 들어옴
    // 회원 정보를 어디서 가져왕..? => home 에서의 useQuery~~~~

    const { isLoading, data } = useQuery(["noLogInMain"], fetchMain);

    console.log('현재 고객의 타입!', data.userType);
    console.log('현재 고객의 타입!', data.designerInfo);
    // const { id } = useParams();

    const id = '1';
    const username  = '원재현';
    const usertype  = 'designer';

    return <ViduRoom sessionId={id} userName = {username} userType ={ usertype }/>;
}

export default ViduRoomWrapper;