import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../api/api";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate;

  const signupUser = async (e) => {
    e.preventDefault();
    const response = await userRequest(username, password, "/auth/signup");
    if (response.error != null) {
      //error so do something
      setError(response.error);
    } else {
      setError(null);
      //not error, setstate to success, router link to dashboard
    }
  };

  return (
    <div className="signupPage">
      <div className="signupContainer">
        {" "}
        <h2>Signup</h2>
        {error ? <div>{error}</div> : <div></div>}
        <form className="signupForm" onSubmit={signupUser}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            className="signupInput"
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
            className="signupInput"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
          <input type="submit" value="Signup" className="signupButton"></input>
        </form>
        <div className="loginLink">
          Have an account? Log in
          <button
            onClick={() => {
              navigate("/login");
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}
