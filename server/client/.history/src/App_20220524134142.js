import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Dashboard/Products/Products";
import Buyers from "./components/Dashboard/Buyers/Buyers";
import Productprices from "./components/Dashboard/Productprices/Productprices";
import Invoices from "./components/Dashboard/Invoices/Invoices";
import RequireAuth from "./components/RequireAuth";
import PersistAuth from "./components/PersistAuth";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page
function App() {
  const [selectedCategory, setSelectedCategory] = useState("Overview");
  return (
    <BrowserRouter>
      <Routes>
        {/* pubic routes */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        {/* protected routes */}
        <Route element={<PersistAuth></PersistAuth>}>
          <Route element={<RequireAuth></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}>
              <Route path="/dashboard/products" element={<Products></Products>}></Route>
              <Route path="/dashboard/buyers" element={<Buyers></Buyers>}></Route>
              <Route path="/dashboard/invoices" element={<Invoices></Invoices>}></Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<div>404page</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
