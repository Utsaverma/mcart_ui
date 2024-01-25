import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addresses: [
        {
            addressId: 1,
            fullName: 'Utsav Verma',
            address: '328/13, Purani Sabzi Mandi, Brahmani Tola',
            landmark: 'Selection Square',
            city: 'Lucknow',
            zipCode: '226003',
            phoneNo: '+91-9044311895',
            additionalInstructions: '',
        },
        {
            addressId: 2,
            fullName: 'Utsav Verma',
            address: 'C4-1317, Gardenia Gateway, Noida-75',
            landmark: 'opp JM Orchid',
            city: 'Noida',
            zipCode: '201304',
            phoneNo: '+91-9044311895',
            additionalInstructions: 'Handover to Guard',
        }
    ],
    currentSelected: {}
  };

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateCurrentAddress: (state, action) => {
        state.currentSelected = action.payload;
    },
    updateAllAddress: (state, action) => {
        state.addresses = action.payload;
    }
  },
});


export const { updateCurrentAddress, updateAllAddress } = addressSlice.actions;

export const getCurrentAddress = (state) => state.address.currentSelected;

export const getAllAddress = (state) => state.address.addresses;

export default addressSlice.reducer;
  