import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: {}
  };

export const paymentDetailsSlice = createSlice({
  name: 'paymentDetails',
  initialState,
  reducers: {
    updatePaymentDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { updatePaymentDetails } = paymentDetailsSlice.actions;

export const getpaymentDetails = (state) => state.paymentDetails.value;

export default paymentDetailsSlice.reducer;
  