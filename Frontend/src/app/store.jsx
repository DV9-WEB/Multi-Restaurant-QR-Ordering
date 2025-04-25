import { configureStore } from "@reduxjs/toolkit";
// import your reducer below after Step 3
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
