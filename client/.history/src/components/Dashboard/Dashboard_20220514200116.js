export default function Dashboard(props) {
  const { loginSuccess } = props;
  return loginSuccess ? <div>login success</div> : <div>please login</div>;
}
