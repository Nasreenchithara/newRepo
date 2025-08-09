import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import config from "../Config";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiURL}/auth/login`, loginData);
      if (response.status === 200) {
        const { token, message, id } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", id);

        setSnackbar({ open: true, message, severity: "success" });
        navigate("/home");
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Login failed", severity: "error" });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>Dont have an account <Link to='/register'>Reigster</Link></p>
        <p>Forget Password <Link to='/emailsent'>Forget</Link></p>

      </form>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

