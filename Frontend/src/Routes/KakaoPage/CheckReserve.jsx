import { styled } from "styled-components";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";

const Container = styled.div`
margin: 50px;
`;


function CheckReserve (){
    return(
        <Container>
            <p> 카카오페이 서비스 결제 만들 페이지</p>
            <hr/>
            <button>결제하기</button>


        </Container>
    );
}


export default CheckReserve;