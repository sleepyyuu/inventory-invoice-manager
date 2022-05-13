import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
