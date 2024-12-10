import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products.push(action.payload);
    },
    updateProduct(state, action) {
      const idx = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      if (idx !== -1) {
        state.products[idx] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (curProduct, id) => id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
