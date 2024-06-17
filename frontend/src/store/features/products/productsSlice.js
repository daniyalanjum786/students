import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService.js";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productsData, thunkAPI) => {
    try {
      const response = await productsService.create(productsData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (thunkAPI) => {
    try {
      const response = await productsService.readAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "categories/getSingleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productsService.readSingle(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ inputValues, productId }, thunkAPI) => {
    try {
      const response = await productsService.update({ inputValues, productId });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productsService.deletePro(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
