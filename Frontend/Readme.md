### Getting Started with Create React App

#### public 이미지 접근
``` <Img src="/icon/complete.png" />```

#### 리액트 상태 관리
- Recoil 사용
```import { atom, useRecoilState } from 'recoil';```
```npm install recoil```


#### 페이지 이동 방식 
1. navigate 
```jsx
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  <Logo onClick={() => navigate("/")}>Chu<Logo>
}
```
2. Router, Link
    - App.jsx에 해당페이지 import하고, 라우터 등록하기
    - 페이지 이동 입력할 페이지에 Link import 해오기
    - <Link> 태그로 이동 설정

```jsx
import { Link, useNavigate } from "react-router-dom";

<Logo to="/">Chu<Logo>
```

#### alert 창 커스텀
- 쉽게 설명하면, 기존 alert 대신 swal로만 적으면 된다.!
```js
// 설치
npm install sweetalert --save
// index.js에 코드 추가
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
// 기존 onClick={()=>alert("메세지")}
onClick={()=> swal("메세지")}

```

#### React Calender 

1. ```npm install react-calendar```
2. ```npm install moment --save ```


#### Main Margin
```
margin-left: 150px;
margin-right: 150px;

```

#### hover motion


```
import { motion,AnimatePresence,useAnimation }from "framer-motion";

const pofolVariants = {
	nomal: {
		scale: 1,
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2
		},
	},
}

variants={pofolVariants}
initial="nomal"
whileHover="hover"
```

#### onChange, onInput, onBlur
```Text
- 디자이너 마이페이지의 한줄 소개를 수정하기 위해 처음 onInput을 사용
	- 하지만, 사용자 텍스트를 하나하나 반영한다는 문제가 발생
	- 사용자가 타이핑하는 동안 발생한 각 입력마다 함수가 호출되므로, 상태 업데이트 등의 작업이 빈번하게 발생
[해결]
- onBlur 이벤트를 사용하여 사용자의 입력이 완료된 후에 상태를 업데이트
```