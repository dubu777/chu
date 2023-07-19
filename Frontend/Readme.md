### Getting Started with Create React App

#### 페이지 이동 방식 
1. navigate 
```jsx
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  <Logo onClick={() => navigate("/")}>Chu<Logo>
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