// import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
// import CustomSelect from "../components/customselect";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [nin, setNin] = useState("");
  const [role, setRole] = useState("Farmer");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await register({
        firstname,
        lastname,
        email,
        password,
        role,
        address,
        nin,
      });
      navigate("/dashboard");
    } catch (err: any) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-card">
        <div className="logo">FARMCONNECT</div>
        <div className="subtitle">Create your trading account</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Doe"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="form-row"> */}
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="john.doe@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* </div> */}

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Date of Birth</label>
              <input
                type="date"
                className="input-field"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="080..."
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Residential Address</label>
            <input
              type="text"
              className="input-field"
              placeholder="Street, City, State"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">NIN (Verification)</label>
            <input
              type="text"
              className="input-field"
              placeholder="11-digit NIN"
              required
              value={nin}
              onChange={(e) => setNin(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Role</label>
            <select
              className="select-field"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer" selected>
                Buyer
              </option>
              <option value="farmer">Farmer</option>
              <option value="transporter">Transporter</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </div>
        <a href="/dashboard" className="back-link">
          ← Back to Market
        </a>
      </div>
    </div>
  );
}
