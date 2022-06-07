import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Invoice from "./Invoice/Invoice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>
      <Link to="/invoice">invoices</Link>
    </div>
  ) : (
    <div>please login</div>
  );
}
