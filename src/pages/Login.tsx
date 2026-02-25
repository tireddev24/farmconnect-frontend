// import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { success, message } = await login({ username, password });
      // await getMe();

      toaster.create({
        type: success ? "success" : "warning",
        description: message,
      });

      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="login-card">
        <div className="logo">FARMCONNECT</div>
        <div className="subtitle">Access the Agricultural Marketplace</div>
        <form id="loginForm">
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              id="username"
              className="input-field"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Log In
          </button>
          <div id="errorMsg" className="error-msg">
            Invalid credentials. Try 'buyer'.
          </div>
        </form>
        <div className="links">
          <a href="#" className="link-text">
            Forgot Password?
          </a>
          <a href="/register" className="link-text">
            Create Account
          </a>
        </div>
        <a
          href="/dashboard"
          className="link-text"
          style={{ marginTop: "30px" }}
        >
          ← Back to Market
        </a>
      </div>
    </div>
  );
}
