import { createSlice } from '@reduxjs/toolkit';
// cart.js
const initialState = {
    value: {}
  };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { update } = cartSlice.actions;

export const getCart = (state) => state.cart.value;

export default cartSlice.reducer;
  