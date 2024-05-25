import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  status: "idle",
  error: null,
};
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      window.localStorage.removeItem("user"); // Clear user from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
