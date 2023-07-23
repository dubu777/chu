// 여기는 디자이너 마이페이지
import styled from "styled-components";
import React, {useState, useEffect} from "react";

const Container = styled.div`
    
`;
// 고정 프로필바
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
	width: 100%;
	height: 300px;
	background-color: #f5f5d4;
    
`;
const Box = styled.div`
  border: solid 2px gray;
  width: 30%;
`;

function DesignerMyPage(){

  return(
    <Container>
      <Wrapper>
        <Box>


        </Box>
        <Box>

        </Box>
        <Box>

        </Box>

      </Wrapper>
            
    </Container>
        
    )

}


export default DesignerMyPage;