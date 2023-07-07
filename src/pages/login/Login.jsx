import React, { useState } from "react";
import "./Login.scss";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post("/auth/login", { username, password });

      localStorage.setItem("user", JSON.stringify(res.data));
      nav("/");

      console.log(res);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {err && err}
      </form>
    </div>
  );
};

export default Login;
