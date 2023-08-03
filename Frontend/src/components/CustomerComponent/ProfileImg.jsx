import { styled } from "styled-components";
import React, { useState, useRef } from 'react';
import swal from "sweetalert";

const Profile = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  /* 이미지 상태에 따라 태두리 색 다르게 */
  border: 7px solid ${props => props.hasFile ? 'lightblue' : 'transparent'};
  cursor: pointer;
`;

function ProfileImg() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 사진을 클릭하면 파일 선택 다이얼로그를 나타내는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일을 선택했을 때 호출되는 이벤트 핸들러
  function handleFileChange(event){
    const file = event.target.files[0];
    // 파일 타입이 image를 포함하는지 확인 후 객체 생성
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {   // 선택된 파일이 이미지 파일이 아닌 경우 alert 창 띄우기
      swal('⚠️ Image 파일 형식을 선택해주세요 :)');
    }
  };

  return (
    <div>
      {/* 버튼을 클릭하면 파일 선택 다이얼로그를 나타내는 input 요소 */}
      <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      
      {/* 프로필 사진 or 연산자는 앞의 피연산자 기준*/}
      <Profile onClick={handleImageClick} src={selectedFile || './icon/profile2.png'} alt="Profile" hasFile={selectedFile !== null} />
    </div>
  );
}

export default ProfileImg;
