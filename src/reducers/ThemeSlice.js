import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    update: (state, _) => {
      if (state.value === 'dark') {
        state.value = 'light';
      }
      else {
        state.value = 'dark';
      }
    }
  },
});


export const { update } = themeSlice.actions;

export const getCurrentTheme = (state) => state.theme.value;

export default themeSlice.reducer;
