import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../redux/features/themeSlice";



const Home = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <div style={{backgroundColor:theme}}>
      <h1>Men Ana sehifeyem</h1>
      <Link to="/login">
        <div>login</div>
      </Link>
      <Link to="/register">
        <div>qeydiyyatdan kec</div>
      </Link>
      <div onClick={() => dispatch(toggleTheme())}>
        {theme === "white" ? "black" : "white"} 
      </div>
    </div>
  );
};

export default Home;
