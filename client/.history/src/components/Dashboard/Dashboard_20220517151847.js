import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Products from "./Products/Products";
import Buyers from "./Buyers/Buyers";
import Productprices from "./Productprices/Productprices";
import Invoices from "./Invoices/Invoices";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState({});

  const handleClick = (view) => {};

  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>

      <div>
        <button>Products</button>
        <button>Buyers</button>
        <button>ProductPrices</button>
        <button>Invoices</button>
      </div>
      <div>{currentView ? currentView.element : <div></div>}</div>
    </div>
  ) : (
    <div>please login</div>
  );
}
