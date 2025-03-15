import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import  themeReducer  from "../redux/features/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme:themeReducer
  },
});
