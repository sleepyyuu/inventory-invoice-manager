import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { FaFileInvoiceDollar, FaHome, FaStore, FaProductHunt } from "react-icons/fa";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const [selectedCategory, setSelectedCategory] = useState("");

  return auth.accessToken ? (
    <div className="dashboardPage">
      <div className="sidebarContainer">
        <NavLink
          to="/dashboard"
          exact="true"
          end
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navBuyersButton"
        >
          <FaHome className="sidebarIcon" size={28}></FaHome>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navProductsButton"
        >
          <FaProductHunt className="sidebarIcon"></FaProductHunt>
        </NavLink>
        <NavLink
          to="/dashboard/buyers"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navBuyersButton"
        >
          <FaStore className="sidebarIcon"></FaStore>
        </NavLink>
        <NavLink
          to="/dashboard/invoices"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navInvoicesButton"
        >
          <FaFileInvoiceDollar className="sidebarIcon"></FaFileInvoiceDollar>
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
