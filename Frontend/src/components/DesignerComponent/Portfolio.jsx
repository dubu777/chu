import { styled } from "styled-components";
import { useState, useEffect } from "react";

const Img = styled.img`
  width: 200px;
  height: 400px;
`;

function Portfolio(){
  const [selectedFiles, setSelectedFiles] = useState([]);


  function handleFileChange(e) {
    // const files = Array.from(e.target.files);
    // setSelectedFiles((prevSelected) => [...prevSelected, ...files]);
    const files = Array.from(e.target.files);
    setSelectedFiles((prevSelected) => [...prevSelected, ...files]);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // 읽어온 파일의 데이터를 사용하여 미리보기할 수 있습니다.
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  })};

  function handleRemove(index) {
    setSelectedFiles((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected.splice(index, 1);
      return newSelected;
    });
  }
    return(
      <div>
      <input type="file" multiple onChange={handleFileChange} />

      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            {file.type.includes('image/') ? (
              <Img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
            ) : (
              <span>{file.name}</span>
            )}
            <button onClick={() => handleRemove(index)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
    )
}

export default Portfolio;