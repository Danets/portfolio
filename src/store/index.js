import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    post: postSlice,
  },
});
