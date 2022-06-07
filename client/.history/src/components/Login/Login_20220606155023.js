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
      const info = response.response.data.info;
      setAuth({ username, accessToken, info });
      navigate("/dashboard");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Login</h2>
        {error ? <div className="errorContainer">{error}</div> : <div className="errorContainer">&nbsp;</div>}
        <form className="loginForm" onSubmit={loginUser}>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="loginInput"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          ></input>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="loginInput"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
          <input type="submit" value="Login" className="submitButton"></input>
        </form>
        <button className="submitButton" id="demoButton">
          Demo/Guest Login
        </button>
        <div
          className="signupLink"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Need an account? Sign up
        </div>
      </div>
    </div>
  );
}
