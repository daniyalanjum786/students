import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService.js";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

// export const addCategory = createAsyncThunk(
//   "categories/addCategory",
//   async (categoryName, thunkAPI) => {
//     try {
//       const response = await categoryService.create(categoryName);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
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
  // extraReducers: (builder) => {
  // builder
  //   .addCase(addCategory.pending, (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   })
  //   .addCase(addCategory.fulfilled, (state, action) => {
  //     state.status = "success";
  //     state.categories = action.payload;
  //   })
  //   .addCase(addCategory.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.payload;
  //   });
  // },
});

export default productSlice.reducer;
