import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../api/api";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = async (e) => {
    e.preventDefault();
    const response = await signup(username, password);
    console.log(response);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={signupUser}>
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
        <input type="submit" value="Signup"></input>
      </form>
    </div>
  );
}
