import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();

  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>
      <button
        onClick={() => {
          const navigate = useNavigate();
          navigate("/invoice");
        }}
      >
        invoices
      </button>
    </div>
  ) : (
    <div>please login</div>
  );
}
