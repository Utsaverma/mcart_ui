import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
  };

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    append: (state, action) => {
      state.value = state.value.concat(action.payload)
    }
  },
});


export const { update, append } = productsSlice.actions;

export const getProducts = (state) => state.products.value;

export default productsSlice.reducer;
  