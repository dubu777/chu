import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import WorldCupRoom from "./WorldCupRoom";
import { loginResultState, loginState } from '../../recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from "react-query";
import { fetchMain } from "../../apis/common.js";
import { getSessionId } from "../../apis/openvidu"
import { TrySharp } from "@mui/icons-material";

function WorldCupRoomWrapper() {
    const { consultingSeq } = useParams();
    const [id, setId] = useState(null);
    const [rrr, setRrr] = useState(null);
  
    const getSession = async (consultingSeq) => {
      try {
        const response = await getSessionId(consultingSeq);
        console.log(response);
        setId("worldCup" + response.url);
        setRrr(response.confusionHair);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSession(consultingSeq);
    }, [consultingSeq]);
  
    return id && rrr ? (
      <WorldCupRoom
        sessionId={id}
        resultimgs={rrr}
      />
    ) : (
      <div>Loading...</div>
    );
  }
  
  export default WorldCupRoomWrapper;