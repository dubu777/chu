import { styled } from "styled-components";
import { useState, useEffect } from "react";
import {getPortfolio, deletePortfolio} from "../../apis/designer";

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
  width: 55%;
  height: 200px;
  border: 3px dotted orange;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const UploadText = styled.p`
`;

function Portfolio(){
  const [data, setData] = useState(
    );
    // 컴포넌트 마운트 될 때 API호출 
    const seq = 2;
    // 마운트 될 때 실행
    useEffect(()=> {
      async function fetchData() {
        try {
          const response = await getPortfolio(seq);
          setData(response)
        } catch(error){
          console.log('프로필 사진 조회 실패:', error)
        }
      }
      fetchData();
    }, []);

    // imgSeq와 일치하는 이미지 삭제
    // 해당 이미지를 제외한 나머지 이미지들로 배열 업데이트
    const handleDelete = async (imgSeq) => {
      try {
        const result = await deletePortfolio(seq, imgSeq);
        if (result){
          const updatedImgs = data.imgs.filter((img) => img.imgSeq !== imgSeq);
          setData({ ...data, imgs: updatedImgs });
          console.log(imgSeq, '번 이미지 삭제')
        }
      } catch(error){
        console.log(error)
      }
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    reader.onloadend = () => {
      const newImg = {
        imgSeq: data.imgs.length + 1,
        imgName: reader.result
      };
      setData({ ...data, imgs: [...data.imgs, newImg] });
    };
    reader.readAsDataURL(file);
  };
    //   const newImg = {
    //     imgSeq: data.imgs.length + 1,
    //     imgName: URL.createObjectURL(file)
    //   };
    //   setData({ ...data, imgs: [...data.imgs, newImg] });
    // };
  
    return(
      <Container>
        <Wrapper>
        <ImgWrapper>
        {data.imgs.map((img) => (
        <ImgBox key={img.imgSeq}>
          <Img src={img.imgName} alt="Image" />
          <DeleteBtn onClick={() => handleDelete(img.imgSeq)}>
            <p>{img.imgSeq}//{img.imgName}</p>
            <DeleteImg src={"./icon/bin.png"}></DeleteImg>
          </DeleteBtn>
        </ImgBox>
      ))}
      </ImgWrapper>
      </Wrapper>
      {data.imgs.length === 0 && (
            <MessageBox>
              <IconImg src={"./icon/file.png"}></IconImg>
              <UploadText>포트폴리오 사진을 업로드 해주세요 :)</UploadText>
            </MessageBox>
      )}
      <UploadBox>
          <input type="file" onChange={handleFileChange} />
      </UploadBox>
      </Container>
    )
}

export default Portfolio;


