import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Products from "./Products/Products";
import Buyers from "./Buyers/Buyers";
import Productprices from "./Productprices/Productprices";
import Invoices from "./Invoices/Invoices";
import PersistAuth from "../PersistAuth";
import RequireAuth from "../RequireAuth";
import { useNavigate, Link, Outlet, location, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState();

  const handleClick = (view, element) => {
    setCurrentView({ view, element });
  };

  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>

      <div>
        <Link to="/dashboard/products">Products</Link>
        <Link to="/dashboard/buyers">buyers</Link>
        <Link to="/dashboard/Productprices">productprices</Link>
        <Link to="/dashboard/invoices">invoices</Link>
      </div>

      <div>
        <Outlet></Outlet>{" "}
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
