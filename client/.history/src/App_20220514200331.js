import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page
function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [auth, setAuth] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess}></Login>}
        ></Route>
        <Route path="/signup" element={<Signup loginSuccess={loginSuccess}></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard loginSuccess={loginSuccess}></Dashboard>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
