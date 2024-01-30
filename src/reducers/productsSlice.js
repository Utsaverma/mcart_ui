import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    saleProducts: [],
    featuredProducts: []
  };

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    update: (state, action) => {
      state.products = action.payload;
    },
    append: (state, action) => {
      state.products = state.products.concat(action.payload)
    },
    updateSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    appendSaleProducts: (state, action) => {
      state.saleProducts = state.saleProducts.concat(action.payload)
    },
    updateFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    appendFeaturedProducts: (state, action) => {
      state.featuredProducts = state.featuredProducts.concat(action.payload)
    }
  }
});


export const { update, append, updateSaleProducts, appendSaleProducts, updateFeaturedProducts, appendFeaturedProducts  } = productsSlice.actions;

export const getProducts = (state) => state.products.products;
export const getSaleProducts = (state) => state.products.saleProducts;
export const getFeaturedProducts = (state) => state.products.featuredProducts;

export default productsSlice.reducer;
  