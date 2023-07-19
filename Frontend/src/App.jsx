import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import SignUp from "./Routes/SignUpPage/SignUp";
import LogIn from "./Routes/LogInPage/LogIn";
import UserType from "./Routes/SignUpPage/UserType";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="usertype" element={<UserType/>} />
      </Routes>
    </Router>
  )
};

export default App;

