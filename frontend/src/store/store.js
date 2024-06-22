import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import userReducer from "./features/users/userSlice.js";
import productsReducer from "./features/products/productsSlice.js";
import categoryReducer from "./features/categories/categorySlice.js";
import cartReducer from "./features/cart/cartSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productsReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});
