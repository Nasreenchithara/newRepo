
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";
import config from "../Config";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${config.apiURL}/forget/send-otp`, { email });
      setMessage(response.data.msg);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${config.apiURL}/forget/verify-otp`, { email, otp });
      setMessage(response.data.msg);
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Invalid OTP");
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(`${config.apiURL}/forget/change-password`, { email, newPassword });
      setMessage(response.data.msg);
      setStep(4);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error changing password");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5">Reset Password</Typography>
      {message && <Typography color="primary">{message}</Typography>}
      {step === 1 && (
        <>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={handleSendOtp}>
            Send OTP
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </>
      )}

      {step === 4 && (
        <Typography color="green">Password changed successfully!</Typography>
      )}
    </Container>
  );
};

export default PasswordReset;