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
    const response = await authService.loginUser(user);
    window.localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
    return response;
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
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
