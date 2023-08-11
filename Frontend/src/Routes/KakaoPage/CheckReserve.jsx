import { styled } from "styled-components";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { kakaoPayReady } from "../../apis/kakao";

const Container = styled.div`
margin: 50px;
`;


function CheckReserve (){


    const handleKakaoPayReady = async () => {
        //console.log("handle kakaopay ready");
        try{
            const result = await kakaoPayReady();
            //console.log(result.result);
            window.location.href = result.result

        } catch (error){
            console.log(error);
        }
    }


    return(
        <Container>
            <p> 카카오페이 서비스 결제 만들 페이지</p>
            <hr/>
            <button onClick={handleKakaoPayReady}>결제하기</button>

        </Container>
    );
}


export default CheckReserve;