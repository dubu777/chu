/* eslint-disable */
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { async } from "q";
import { useParams } from "react-router";
import { func } from "prop-types";
import { useRecoilState } from "recoil";
import {getPortfolio, deletePortfolio, postPortfolio} from "../../apis/designer"
import { loginResultState } from "../../recoil/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  text-align: center;
  align-items: center;

`;
const ImgWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 5px;
  align-items: center;
`;
const Img = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 0.3rem;
`;
const DeleteBtn = styled.div`
  margin-top: -35px;
  margin-left: 100px;
  cursor: pointer;
`;
const DeleteImg = styled.img`
  width: 25px;
  height: 25px;
`;
const IconImg = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 20px;
`;
const UploadBox = styled.div`
  margin-top: 50px;
`;
const MessageBox = styled.div`
  margin-top: 60px;
  width: 55%;
  height: 200px;
  border: 2px dotted lightsalmon;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const UploadText = styled.p`
`;

function Portfolio(){
  
  // 컴포넌트 마운트 될 때 API호출 
  const [data, setData] = useState();
  const { designerSeq } = useParams();
  const [loginState, setLoginResultState] = useRecoilState(loginResultState);
  const [selectedImage, setSelectedImage] = useState(null); 
  // 지금은 로그인 안된 상태라 에러 발생
  // const seq = 2;
  // 마운트 될 때 실행
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
        const response = await getPortfolio(designerSeq);
        setData(response)
        console.log('포폴data', response);
      } catch(error){
        console.log('포트폴리오 사진 조회 실패:', error)
      }
    };

  // imgSeq와 일치하는 이미지 삭제
  // 해당 이미지를 제외한 나머지 이미지들로 배열 업데이트
  const handleDelete = async (imgSeq) => {
    try {
      const result = await deletePortfolio(designerSeq, imgSeq);
      console.log(result)
      // 받아오는 결과 형태 잘 확인하기
      if (result){
        const updatedImgs = data.imgs.filter((img) => img.imgSeq !== imgSeq);
        setData({ ...data, imgs: updatedImgs });
        console.log(imgSeq, '번 이미지 삭제')
      }
    } catch(error){
      console.log(error)
    }
  };

  // 이미지 등록 - API 맞춰서 수정해야함
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("img", file);
    console.log('폼포로포몸',formData)
    try {
      // 이미지를 서버에 업로드하고 imgSeq를 받아옴
      const response = await postPortfolio(designerSeq, formData);
      
        const newImg = {
          imgSeq: response, // 서버에서 받아온 imgSeq 사용
          imgName: file.name,

        }
        // setData({ ...data, imgs: [...data.imgs, newImg] });
        setData((prevData) => ({
          ...prevData,
          imgs: [...prevData.imgs, newImg],
        }));
        fetchData();

      } catch (error) {
        console.error(error);
    }
  };

  return(
    <Container>
    {data ? (
      <>
        {data.imgs && data.imgs.length > 0 ? (
          <Wrapper>
            <ImgWrapper>
              {data.imgs.map((img) => (
                <ImgBox key={img.imgSeq}>
                  <Img src={`https://i9b111.q.ssafy.io/api/portfolio/${img.imgName}`} alt="Image" /> 
                  <DeleteBtn onClick={() => handleDelete(img.imgSeq)}>
                    <DeleteImg src="/icon/bin.png"></DeleteImg>
                  </DeleteBtn>
                </ImgBox>
              ))}
            </ImgWrapper>
          </Wrapper>
        ) : (
          <MessageBox>
            <IconImg src="/icon/file.png"></IconImg>
            <UploadText>포트폴리오 사진을 업로드 해주세요 :)</UploadText>
          </MessageBox>
        )}
        <UploadBox>
          <input type="file" onChange={handleFileChange} />
        </UploadBox>
      </>
    ) : (
      <p>...loading</p>
    )}
  </Container>
  
  
)}

export default Portfolio;


// {data.imgs.length === 0 || (null && (
//   <MessageBox>
//     {/* <IconImg src={"./icon/file.png"}></IconImg> */}
//     <IconImg src="/icon/file.png"></IconImg>
//     <UploadText>포트폴리오 사진을 업로드 해주세요 :)</UploadText>
//   </MessageBox>
// ))}