import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import config from "../Config";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiURL}/auth/register`, registerData);
      setSnackbar({ open: true, message: response.data.message, severity: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed", severity: "error" });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
     </form>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
