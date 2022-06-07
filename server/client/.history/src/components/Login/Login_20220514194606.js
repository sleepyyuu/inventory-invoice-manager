import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../api/api";
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginSuccess } = props;

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await userRequest(username, password, "/users/session");
    if (response.error != null) {
      //error so do something
      setError(response.error);
    } else {
      setError(null);
      //not error, setstate to success, router link to dashboard
      console.log(response.response.data);
    }
  };

  return (
    {loginSuccess} ? {()=>{navigate('/dashboard' return null}) : }
  );
}
