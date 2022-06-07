import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../api/api";
import "./Login.css";
export default function Login(props) {
  const { setAuth, auth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await userRequest(username, password, "/auth/login");
    if (response.error != null) {
      //error so do something
      setError(response.error);
    } else {
      setError(null);
      //not error, setstate to success, router link to dashboard
      const username = response.response.data.username;
      const accessToken = response.response.data.accessToken;
      setAuth({ username, accessToken });
      navigate("/dashboard");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Login</h2>
        {error ? <div>{error}</div> : <div></div>}
        <form className="loginForm" onSubmit={loginUser}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
          <input type="submit" value="Login"></input>
        </form>
        <div className="signupLink">Need an account? Sign up</div>
      </div>
    </div>
  );
}
