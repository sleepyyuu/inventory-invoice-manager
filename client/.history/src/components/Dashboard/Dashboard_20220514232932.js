import useAuth from "../../hooks/useAuth";

export default function Dashboard(props) {
  const { auth } = useAuth();
  return auth.username ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
    </div>
  ) : (
    <div>please login</div>
  );
}
