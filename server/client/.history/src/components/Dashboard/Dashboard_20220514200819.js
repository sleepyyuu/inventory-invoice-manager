export default function Dashboard(props) {
  const { loginSuccess, auth } = props;
  return loginSuccess ? (
    <div>
      <div>login success</div>
      <div>user : {auth.username}</div>
      <div>accesstoken : {auth.accessToken}</div>
    </div>
  ) : (
    <div>please login</div>
  );
}
