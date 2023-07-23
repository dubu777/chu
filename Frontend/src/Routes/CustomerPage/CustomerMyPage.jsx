// 여기는 고객 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import CustomerPageInfo from "../../components/CustomerComponent/CustomerPageInfo";

const Container = styled.div`
`;
const Wrapper = styled.div`
`;

const ImgBox = styled.box`
  
`;
const TextBox = styled.box`
  
`;
const InfoBox = styled.box`
`;

function CustomerMyPage(){
  return(
    <Container>
      <Wrapper>
        <CustomerPageInfo />
      </Wrapper>

      {/* 예약 정보 확인하기 */}
      <Container>
        <Wrapper>
          <ImgBox>

          </ImgBox>
          <TextBox>

          </TextBox>
          <InfoBox>

          </InfoBox>
        </Wrapper>
      </Container>



    </Container>
    )
}


export default CustomerMyPage;