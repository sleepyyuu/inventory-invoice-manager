import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Invoice from "./components/Invoice/Invoice";
import RequireAuth from "./components/RequireAuth";
import PersistAuth from "./components/PersistAuth";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pubic routes */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        {/* protected routes */}
        <Route element={<PersistAuth></PersistAuth>}>
          <Route element={<RequireAuth></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/invoice" element={<Invoice></Invoice>}></Route>
          </Route>
        </Route>

        <Route path="*" element={<div>404page</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
