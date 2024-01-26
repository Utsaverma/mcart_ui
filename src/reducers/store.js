// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';
import addressReducer from './addressSlice';
import paymentDetailsReducer from './paymentDetailsSlice';

const store = configureStore({
    reducer:{
        products: productsReducer,
        cart: cartReducer,
        user: userReducer,
        address: addressReducer,
        paymentDetails: paymentDetailsReducer
    }
});

export default store;
