import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

const getUserFromLocalStorage = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  status: "idle",
  error: null,
};
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
