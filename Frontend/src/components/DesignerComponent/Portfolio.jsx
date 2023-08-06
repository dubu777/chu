import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { async } from "q";
import { func } from "prop-types";
import {getPortfolio, deletePortfolio} from "../../apis/designer"

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
    {
      imgs : [
        {
            "imgSeq" : 1,
            "imgName" : "/img/opofol5.jpg"
        },
        {
            "imgSeq" : 2,
            "imgName" : "/img/opofol1.jpg"
        },
        {
            "imgSeq" : 3,
            "imgName" : "./img/opofol4.jpg"
        },
        {
          "imgSeq" : 4,
          "imgName" : "/img/opofol5.jpg"
      },
      {
          "imgSeq" : 5,
          "imgName" : "/img/opofol1.jpg"
      },
      {
          "imgSeq" : 6,
          "imgName" : "./img/opofol4.jpg"
      },
     
      ]
    });
    // 컴포넌트 마운트 될 때 API호출 
    const [data1, setData1] = useState([]);
    const seq = 2;
    // useEffect(()=> {
    //   async function Portfolio() {
    //     try {
    //       const data1 = await getPortfolio(seq);
    //       setData1(data1)
    //     } catch(error){
    //       console.log(error)
    //     }
    //   }
    //   Portfolio();
    // }, []);

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

    // 이미지 등록 - API 맞춰서 수정해야함
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
  
    return(
      <Container>
        <Wrapper>
        <ImgWrapper>
        {data.imgs.map((img) => (
        <ImgBox key={img.imgSeq}>
          <Img src={img.imgName} alt="Image" />
          <DeleteBtn onClick={() => handleDelete(img.imgSeq)}>
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



// 다중 파일 업로드(구현 실패)
// import { styled } from "styled-components";
// import { useState, useEffect } from "react";

// const Img = styled.img`
//   width: 200px;
//   height: 400px;
// `;

// function Portfolio(){
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [data, setdata] = useState(
//     {
//       imgs : [
//         {
//             "imgSeq" : 1,
//             "imgName" : "img1.png"
//         },
//         {
//             "imgSeq" : 2,
//             "imgName" : "img2.png"
//         },
//         {
//             "imgSeq" : 3,
//             "imgName" : "img3.png"
//         },
//       ]
//     });


//   function handleFileChange(e) {
//     // const files = Array.from(e.target.files);
//     // setSelectedFiles((prevSelected) => [...prevSelected, ...files]);
//     const files = Array.from(e.target.files);
//     setSelectedFiles((prevSelected) => [...prevSelected, ...files]);

//   files.forEach((file) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       // 읽어온 파일의 데이터를 사용하여 미리보기할 수 있습니다.
//       console.log(reader.result);
//     };
//     reader.readAsDataURL(file);
//   })};

//   function handleRemove(index) {
//     setSelectedFiles((prevSelected) => {
//       const newSelected = [...prevSelected];
//       newSelected.splice(index, 1);
//       return newSelected;
//     });
//   }
//     return(
//       <div>
//       <input type="file" multiple onChange={handleFileChange} />

//       <div>
//         {selectedFiles.map((file, index) => (
//           <div key={index}>
//             {file.type.includes('image/') ? (
//               <Img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
//             ) : (
//               <span>{file.name}</span>
//             )}
//             <button onClick={() => handleRemove(index)}>삭제</button>
//           </div>
//         ))}
//       </div>
//     </div>
//     )
// }

// export default Portfolio;