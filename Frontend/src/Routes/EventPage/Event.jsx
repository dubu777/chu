// 여기는 이벤트 페이지(선진)

import { styled } from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
    margin: 40px;
`;

function Event(){

    const customerSeq = localStorage.getItem('userSeq');

    useEffect(() => {
        getSession(customerSeq);
      }, [customerSeq]);

    return(
        <Container>
            <p>여기는 추가 기능 이벤트 페이지</p>
            <p>파이팅🔥</p>
        </Container>
    );
}

export default Event;