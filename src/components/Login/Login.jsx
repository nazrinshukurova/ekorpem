import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/authSlice";
import { toggleTheme } from "../../redux/features/themeSlice";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Login.css";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const Login = () => {
  const dispatch = useDispatch();
  const { status, error, successMessage } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "email" && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Düzgün email daxil edin!" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (id === "password" && !passwordRegex.test(value)) {
      setErrors((prev) => ({ ...prev, password: "Şifrə güclü olmalıdır!" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      dispatch(loginUser(formData));
      setFormData({ email: "", password: "" });
    }
  };

  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;

  return (
    <div className={`app-container ${theme}`}>
      <button
        style={{ color: theme === "light" ? "black" : "white" }}
        className="theme-toggle"
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <div className="registration-container">
        <img src={logo} alt="Logo" />
        <p className="title">Hesabınıza daxil olun</p>

        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="email">
            E-poçt<span className="star">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <label htmlFor="password">
            Şifrə<span className="star">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className={!isFormValid ? "disabled-button" : ""}
          >
            {status === "loading" ? "Giriş edilir..." : "Giriş edin"}
          </button>

          {error && <p className="error-text">{error}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}
          <p className="sub-text">
            Hesabınız yoxdur?
            <Link style={{ textDecoration: "none" }} to="/register">
              <span className="qeydiyyat">Qeydiyyatdan keçin</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
