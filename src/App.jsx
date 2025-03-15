import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/app/store.js";

import "./index.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <div className="container">
            <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
