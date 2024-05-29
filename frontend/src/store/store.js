import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import userReducer from "./features/users/userSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});
