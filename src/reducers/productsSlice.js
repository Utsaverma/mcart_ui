import { createSlice } from '@reduxjs/toolkit';
// cart.js
const initialState = {
    value: {}
  };

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { update } = productsSlice.actions;

export const getProducts = (state) => state.products.value;

export default productsSlice.reducer;
  