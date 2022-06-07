import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { FaFileInvoiceDollar, FaHome, FaStore, FaProductHunt } from "react-icons/fa";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const { selectedCategory, setSelectedCategory } = props;

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
          <FaHome
            className="sidebarIcon"
            size={30}
            onClick={() => {
              setSelectedCategory("Overview");
            }}
          ></FaHome>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navProductsButton"
        >
          <FaProductHunt className="sidebarIcon" size={30}></FaProductHunt>
        </NavLink>
        <NavLink
          to="/dashboard/buyers"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navBuyersButton"
        >
          <FaStore className="sidebarIcon" size={30}></FaStore>
        </NavLink>
        <NavLink
          to="/dashboard/invoices"
          exact="true"
          className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
          id="navInvoicesButton"
        >
          <FaFileInvoiceDollar className="sidebarIcon" size={30}></FaFileInvoiceDollar>
        </NavLink>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="dashboardInfoContainer">
        <div className="dashboardInfoPage">
          <div className="infoPagePadding">
            <div className="dashboardInfoHeader">
              <h3 className="infoPageTitle">{selectedCategory}</h3>
              <div className="dashboardButtons">
                <button>add thing button</button>
              </div>
            </div>
            <div className="infoContainer">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
