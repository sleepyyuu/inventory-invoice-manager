import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>please login</div>
  );
}
