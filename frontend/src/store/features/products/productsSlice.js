import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService.js";

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

export const add = createAsyncThunk(
  "products/add",
  async (productData, thunkAPI) => {
    try {
      const response = await productsService.addProduct(productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
