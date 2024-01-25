import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: {}
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { update } = userSlice.actions;

export const getUser = (state) => state.user.value;

export default userSlice.reducer;
  