import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";

const Login = ({ onAuthSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    createFallingLetters();
  }, []);

  const createFallingLetters = () => {
    const container = document.querySelector(".letters");
    if (!container) return;

    container.innerHTML = "";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const colors = ["#38bdf8", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

    for (let i = 0; i < 25; i++) {
      const span = document.createElement("span");

      span.innerText = letters[Math.floor(Math.random() * letters.length)];
      span.style.left = Math.random() * 100 + "vw";
      span.style.color = colors[Math.floor(Math.random() * colors.length)];

      span.style.animationDuration = 5 + Math.random() * 5 + "s";
      span.style.animationDelay = Math.random() * 5 + "s";

      container.appendChild(span);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      // save token
      localStorage.setItem("token", data.token);

      // update app state
      if (onAuthSuccess) onAuthSuccess(data);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      {/* 🎨 Background Animation */}
      <div className="letters"></div>

      {/* 🧾 Card */}
      <div className="auth-card">
        <div className="logo-row">
          <span className="rocket">🚀</span>
          <span className="logo-text">SmartTask</span>
        </div>

        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/signup")}>
          Don't have an account? <span>Signup</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
