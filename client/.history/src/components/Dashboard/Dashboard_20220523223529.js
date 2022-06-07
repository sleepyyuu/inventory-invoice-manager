import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();

  return auth.accessToken ? (
    <div>
      <div className="sidebarContainer">
        <Link to="/dashboard/products">Products</Link>
        <Link to="/dashboard/buyers">buyers</Link>
        <Link to="/dashboard/invoices">invoices</Link>
      </div>

      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  ) : (
    <div>please login</div>
  );
}
