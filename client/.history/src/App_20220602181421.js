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
import InvoiceDetail from "./components/Dashboard/InvoiceDetail/InvoiceDetail";
import LoadingBar from "./components/LoadingBar";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page
function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingBar></LoadingBar>}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route element={<PersistAuth></PersistAuth>}>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                <Route path="/dashboard" exact element={<Summary></Summary>}></Route>
                <Route path="/dashboard/products" element={<Products></Products>}></Route>
                <Route path="/dashboard/buyers" element={<Buyers></Buyers>}></Route>
                <Route path="/dashboard/invoices" element={<Invoices></Invoices>}></Route>
                <Route path="/dashboard/invoices/:invoiceId" element={<InvoiceDetail></InvoiceDetail>}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>404page</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
