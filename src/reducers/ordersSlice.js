import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      state.value = action.payload;
    },
    updateOrders: (state, action) => {
      state.value.unshift(action.payload);
    },
  },
});


export const { loadOrders, updateOrders } = ordersSlice.actions;

export const getOrders = (state) => state.orders.value;

export default ordersSlice.reducer;
