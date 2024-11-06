import { createSlice } from "@reduxjs/toolkit";

const initialState = [
];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    addProduct: (state, action) => {
      state.push(action.payload);
    },
    
    updateProduct: (state, action) => {
      const { id, name, price } = action.payload;
      const productIndex = state.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state[productIndex] = { ...state[productIndex], name, price };
      }
    },

    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
