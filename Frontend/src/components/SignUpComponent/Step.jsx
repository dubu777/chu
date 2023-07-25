import { styled } from "styled-components";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Cormorant Garamond';
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(249,245,240);
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-bottom: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const StepText = styled.span`
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 15px;
  font-weight: bold;
`;
const Text = styled.span`
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 12px;
  font-weight: bold;
`;

function Step({top, bottom}) {
  return (
      <Wrapper>
        <Circle>
          <StepText>{top}</StepText>
        </Circle>
        <Text>{bottom}</Text>
      </Wrapper>
  )
}
export default Step;