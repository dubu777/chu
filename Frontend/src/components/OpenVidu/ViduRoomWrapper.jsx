import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import ViduRoom from "./ViduRoom";
import { loginResultState, loginState } from '../../recoil/auth';
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from "react-query";
import { fetchMain } from "../../apis/common.js";
import { getSessionId } from "../../apis/openvidu"
import { TrySharp } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

function ViduRoomWrapper() {
    const { consultingSeq } = useParams();
    const [id, setId] = useState(null);
    const [ttt, setTtt] = useState(null);
    const [rrr, setRrr] = useState(null);
    const navigate = useNavigate();

    // 따로 이미 갖고 있는 데이터
    const username = localStorage.getItem('userName');
    const usertype = localStorage.getItem('userType');
    const userSeq = localStorage.getItem('userSeq');

    const getSession = async (consultingSeq) => {
      try {
        const response = await getSessionId(consultingSeq);
        console.log(response);
        setId(response.url);
        setTtt(response.targetHair);
        setRrr(response.confusionHair);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSession(consultingSeq);
    }, [consultingSeq]);
  
    return id && ttt && rrr ? (
      <ViduRoom
        sessionId={id}
        userName={username}
        userType={usertype}
        resultimgs={rrr}
        targetimgs={ttt}
        consultingSeq={consultingSeq}
        navigate={navigate}
        userSeq={userSeq}
      />
    ) : (
      <div>Loading...</div>
    );
  }
  
  export default ViduRoomWrapper;