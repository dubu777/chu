import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Reservation from "./Routes/Reservation";
import SignUp from "./Routes/SignUpPage/SignUp";
import LogIn from "./Routes/LogInPage/LogIn";
import FindId from "./Routes/LogInPage/FindId";
import FoundId from "./Routes/LogInPage/FoundId";
import AuthNum from "./Routes/LogInPage/AuthNum";
import UserType from "./Routes/SignUpPage/UserType";
import FindPw from "./Routes/LogInPage/FindPw";
import ChangePw from "./Routes/LogInPage/ChangePw";
import WorldcupImgUpload from "./Routes/WorldCupPage/WorldcupImgUpload";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="findid" element={<FindId/>} />
        <Route path="findpw" element={<FindPw/>}/>
        <Route path="usertype" element={<UserType/>} />
        <Route path="authnum" element={<AuthNum/>} />
        <Route path="foundid" element={<FoundId/>} />
        <Route path="changepw" element={<ChangePw/>} />
        <Route path="reservation" element={<Reservation/>} />
        <Route path="worlducupimgupload" element={<WorldcupImgUpload/>} />
      </Routes>
    </Router>
  )
};

export default App;

