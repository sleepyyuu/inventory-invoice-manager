import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const [selectedCategory, setSelectedCategory] = useState("");

  return auth.accessToken ? (
    <div className="dashboardPage">
      <div className="sidebarContainer">
        <Link to="/dashboard/products" className="navButton" id="navProductsButton" style={{ backgroundColor: "rgb(182, 185, 225)" }}>
          Products
        </Link>
        <Link to="/dashboard/buyers" className="navButton" id="navBuyersButton">
          buyers
        </Link>
        <Link to="/dashboard/invoices" className="navButton" id="navInvoicesButton">
          invoices
        </Link>
      </div>
      <div className="infoContainer">
        <div>login success</div>
        <div>user : {auth.username}</div>
        <div>accesstoken : {auth.accessToken}</div>
        <button onClick={logout}>Logout</button>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
