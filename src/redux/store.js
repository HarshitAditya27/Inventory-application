import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };
      state.products.push(newProduct);
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
        (curProduct) => curProduct.id !== action.payload
      );
    },
  },
});

export const { addProducts, updateProduct, deleteProduct } =
  productSlice.actions;

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
