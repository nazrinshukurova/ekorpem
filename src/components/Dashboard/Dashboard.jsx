import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice.js";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import "./styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="welcome-section">
          <h3>Welcome, {user?.name || "User"}!</h3>
          {showMessage && (
            <p>You have successfully logged in to the application.</p>
          )}
        </div>
        <div className="user-info">
          <h4>Your Information:</h4>
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
          <p>
            <strong>User ID:</strong> {user?.id || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
