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
// export const getAllCategories = createAsyncThunk(
//   "categories/getAllCategories",
//   async (thunkAPI) => {
//     try {
//       const response = await categoryService.readAll();
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const getSingleCategory = createAsyncThunk(
//   "categories/getSingleCategory",
//   async (slug, thunkAPI) => {
//     try {
//       const response = await categoryService.readSingle(slug);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const updateCategory = createAsyncThunk(
//   "categories/updateCategory",
//   async ({ name, slug }, thunkAPI) => {
//     try {
//       const response = await categoryService.update({ name, slug });
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   "categories/deleteCategory",
//   async (slug, thunkAPI) => {
//     try {
//       const response = await categoryService.deleteCat(slug);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
      });
  },
});

export default productSlice.reducer;
