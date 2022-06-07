import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Dashboard/Products/Products";
import Buyers from "./components/Dashboard/Buyers/Buyers";
import Summary from "./components/Dashboard/Summary/Summary";
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
            <Route
              path="/dashboard"
              element={<Dashboard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Dashboard>}
            >
              <Route
                path="/dashboard"
                exact
                element={<Summary selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Summary>}
              ></Route>
              <Route path="/dashboard/products" element={<Products setSelectedCategory={setSelectedCategory}></Products>}></Route>
              <Route path="/dashboard/buyers" element={<Buyers setSelectedCategory={setSelectedCategory}></Buyers>}></Route>
              <Route path="/dashboard/invoices" element={<Invoices setSelectedCategory={setSelectedCategory}></Invoices>}></Route>
              <Route path="/dashboard/invoices/:invoiceId" element={<div></div>}></Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<div>404page</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
