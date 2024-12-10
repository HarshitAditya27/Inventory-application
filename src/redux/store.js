import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
});

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
