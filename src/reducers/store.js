// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer:{
        products: productsReducer,
        cart: cartReducer,
        user: userReducer
    }
});

export default store;
