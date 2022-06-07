import useAuth from "../../hooks/useAuth";

export default function Dashboard(props) {
  const { auth } = useAuth();
  return auth.accessToken ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
      <button>Logout</button>
    </div>
  ) : (
    <div>please login</div>
  );
}
