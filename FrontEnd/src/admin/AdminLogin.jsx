import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Improved login function with error handling & form prevention
const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    try {
      const res = await axios.post("http://localhost:4000/api/admin/login", { email, password });

      if (res.status === 200 && res.data.token) { // 🔹 Ensure valid response structure
        localStorage.setItem("adminToken", res.data.token);
        alert("✅ Login Successful");
        window.location.href = "/dashboard"; // 🔹 Redirect to the admin panel
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (error) {
      if (error.response) {
        alert(`⚠ Login failed: ${error.response.data.message}`); // 🔹 Show API error message
      } else {
        alert("⚠ Network error. Please check your connection and try again!"); // 🔹 Handle request failures
      }
    }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "370px" }}> {/* 🔹 Added shadow-lg for better UI */}
        <h3 className="text-center mb-5">Admin Login</h3>

        {/* 🔹 Wrapped inputs inside a <form> for better accessibility */}
        <form onSubmit={handleLogin}>
          <div className="mb-3 ">
            <input
              type="email"
              className="form-control p-3"
              placeholder="Email"
              value={email} // 🔹 Controlled input
              onChange={(e) => setEmail(e.target.value)}
              required // 🔹 Ensure required fields
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-3"
              placeholder="Password"
              value={password} // 🔹 Controlled input
              onChange={(e) => setPassword(e.target.value)}
              required // 🔹 Ensure required fields
            />
          </div>
          <div className="text-center"><button type="submit" className="btn btn-outline-primary  w-50"> {/* 🔹 Changed to submit button */}
            Login
          </button></div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;