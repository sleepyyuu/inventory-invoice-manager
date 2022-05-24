import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const [selectedCategory, setSelectedCategory] = useState("");

  return auth.accessToken ? (
    <div className="dashboardPage">
      <div className="sidebarContainer">
        <NavLink to="/dashboard" exact="true"></NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navProductsButton"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/buyers"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navBuyersButton"
        >
          buyers
        </NavLink>
        <NavLink
          to="/dashboard/invoices"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navInvoicesButton"
        >
          invoices
        </NavLink>
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
