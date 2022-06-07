import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Products from "./Products/Products";
import Buyers from "./Buyers/Buyers";
import Productprices from "./Productprices/Productprices";
import Invoices from "./Invoices/Invoices";
import PersistAuth from "../PersistAuth";
import RequireAuth from "../RequireAuth";
import { useNavigate, Link } from "react-router-dom";
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
        <button
          onClick={() => {
            handleClick("Products", <Products />);
          }}
        >
          Products
        </button>
        <button
          onClick={() => {
            handleClick("Buyers", <Buyers />);
          }}
        >
          Buyers
        </button>
        <button
          onClick={() => {
            handleClick("ProductPrices", <Productprices />);
          }}
        >
          ProductPrices
        </button>
        <button
          onClick={() => {
            handleClick("Invoices", <Invoices />);
          }}
        >
          Invoices
        </button>
      </div>

      <div>
        {currentView ? (
          <PersistAuth>
            <RequireAuth>currentView.element </RequireAuth>
          </PersistAuth>
        ) : (
          <div>default view summary</div>
        )}
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
