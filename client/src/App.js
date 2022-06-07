import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AOS from "aos";
import "aos/dist/aos.css";

//useeffect check localstorage for jwt, validate token. if valid then render dashboard, otherwise show login page
function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const finishedLoading = () => {
    setLoadingProgress(100);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingBar loadingProgress={loadingProgress} setLoadingProgress={setLoadingProgress}></LoadingBar>}>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route element={<PersistAuth></PersistAuth>}>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                <Route path="/dashboard" exact element={<Summary></Summary>}></Route>
                <Route path="/dashboard/products" element={<Products finishedLoading={finishedLoading}></Products>}></Route>
                <Route path="/dashboard/buyers" element={<Buyers finishedLoading={finishedLoading}></Buyers>}></Route>
                <Route path="/dashboard/invoices" element={<Invoices finishedLoading={finishedLoading}></Invoices>}></Route>
                <Route
                  path="/dashboard/invoices/:invoiceId"
                  element={<InvoiceDetail finishedLoading={finishedLoading}></InvoiceDetail>}
                ></Route>
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
