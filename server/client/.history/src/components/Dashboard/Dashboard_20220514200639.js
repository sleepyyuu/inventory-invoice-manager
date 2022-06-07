export default function Dashboard(props) {
  const { loginSuccess, auth } = props;
  return loginSuccess ? <div>login success</div> : <div>please login</div>;
}
