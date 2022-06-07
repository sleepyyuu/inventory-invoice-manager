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
          onClick={() => {
            setSelectedCategory("Overview");
          }}
        >
          <FaHome className="sidebarIcon" size={30}></FaHome>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navProductsButton"
          onClick={() => {
            setSelectedCategory("Products");
          }}
        >
          <FaProductHunt className="sidebarIcon" size={30}></FaProductHunt>
        </NavLink>
        <NavLink
          to="/dashboard/buyers"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navBuyersButton"
          onClick={() => {
            setSelectedCategory("Buyers");
          }}
        >
          <FaStore className="sidebarIcon" size={30}></FaStore>
        </NavLink>
        <NavLink
          to="/dashboard/invoices"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navInvoicesButton"
          onClick={() => {
            setSelectedCategory("Invoices");
          }}
        >
          <FaFileInvoiceDollar className="sidebarIcon" size={30}></FaFileInvoiceDollar>
        </NavLink>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="dashboardInfoContainer">
        <div className="dashboardInfoPage">
          <div>login success</div>
          <div>user : {auth.username}</div>

          <div className="infoContainer">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
