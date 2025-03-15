import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/app/store.js";

import "./index.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Dashboard from "./components/Dashboard/Dashboard"; // ✅ Added import
// import Navbar from "./components/Navbar/Navbar"; // ✅ Added import
import PrivateRoute from "./components/PrivateRoute"; // ✅ Added import

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          {/* <Navbar /> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
