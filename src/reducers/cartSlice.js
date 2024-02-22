import { createSlice } from '@reduxjs/toolkit';
// cart.js
const initialState = {
  value: JSON.parse(localStorage.getItem('currentCartVals')) || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      if (state.value) {
        const itemAlreadyAvaialble = state.value.find(obj => obj['asin'] === action.payload['asin']);
        if (itemAlreadyAvaialble) {
          itemAlreadyAvaialble['quantity'] += 1
        }
        else {
          state.value.push(action.payload)
        }
      }
      localStorage.setItem('currentCartVals', JSON.stringify(state.value));
    },
    removeItemFromCart: (state, action) => {
      if (state.value) {
        const itemAlreadyAvaialble = state.value.find(obj => obj['asin'] === action.payload['asin']);
        if (itemAlreadyAvaialble) {
          itemAlreadyAvaialble['quantity'] -= 1
        }
        if (itemAlreadyAvaialble['quantity'] <= 0) {
          state.value = state.value.filter(obj => obj['asin'] !== action.payload['asin']);
        }
      }
      localStorage.setItem('currentCartVals', JSON.stringify(state.value));
    },
    emptyCart: (state, _) => {
      state.value = [];
      localStorage.setItem('currentCartVals', JSON.stringify(state.value))
    }
  },
});


export const { addItemToCart, removeItemFromCart, emptyCart } = cartSlice.actions;

export const getCart = (state) => state.cart.value;

export default cartSlice.reducer;
