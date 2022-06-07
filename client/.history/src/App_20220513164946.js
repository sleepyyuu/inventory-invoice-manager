import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
