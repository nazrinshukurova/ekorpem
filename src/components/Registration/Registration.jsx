import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/authSlice.js";
import logo from "../../assets/logo.png";
import "./Registration.css";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../redux/features/themeSlice.js";

const Registration = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { status, error, successMessage } = useSelector((state) => state.auth);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const phoneRegex = /^\d{10,13}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value.trim(),
    }));

    if (id === "password" && !passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Şifrə ən azı 6 simvol, 1 hərf və 1 rəqəm olmalıdır!",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (id === "email" && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Düzgün email daxil edin!" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (id === "phone" && !phoneRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Telefon nömrəsi 10-13 rəqəm arasında olmalıdır!",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { termsAccepted, ...filteredData } = formData;
    dispatch(registerUser(filteredData));
  };

  const isFormValid =
    formData.name &&
    formData.surname &&
    formData.phone &&
    formData.email &&
    formData.password &&
    formData.termsAccepted &&
    !errors.password &&
    !errors.phone;

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
        <p className="title">Yeni Hesab Yaradın</p>
        <p className="description">
          Körpem.az ailəsinə qoşulun və unikal endirimlər, yeni kolleksiyalar və
          fərdi <br/> təkliflərdən faydalanın.
        </p>

        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Ad<span className="star">*</span>
          </label>
          <input
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="surname">
            Soyad<span className="star">*</span>
          </label>
          <input
            id="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
          />

          <label htmlFor="phone">
            Mobil nömrə<span className="star">*</span>
          </label>
          <input
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <label htmlFor="email">
            E-poçt<span className="star">*</span>
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <label htmlFor="password">
            Şifrə<span className="star">*</span>
          </label>
          <input
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="check-box">
            <label htmlFor="termsAccepted">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              Şərtləri və qaydaları qəbul edirəm
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || status === "loading"}
            className={!isFormValid ? "disabled-button" : ""}
          >
            {status === "loading" ? "Qeydiyyat gedir..." : "Qeydiyyatdan keç"}
          </button>

          {error && <p className="error-text">{error}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}

          <p className="sub-text">
            Artıq hesabınız var?
            <Link style={{ textDecoration: "none" }} to="/login">
              <span className="daxil-olun">Daxil olun</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
