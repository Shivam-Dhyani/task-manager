import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../types";

const usersInitialState = {
  products: {
    productsdata: null,
    isProductsLoading: false,
    productsErrors: "",
  },
};

export const productsSlice = createSlice({
  name: PRODUCTS,
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getAllProductsAction: (state, { payload: id }) => {
      console.log("Hello1");
      state.products.isProductsLoading = true;
      state.products.productsErrors = "";
    },
    getProductsSuccessAction: (state, { payload: products }) => {
      console.log("Hello2");

      state.products.isProductsLoading = false;
      state.products.productsdata = products;
    },
    getProductsErrorAction: (state, { payload: error }) => {
      console.log("Hello3");

      state.products.isProductsLoading = false;
      state.products.productsErrors = error;
    },
  },
});

/* getUserSuccessAction and getUserErrorAction will be used inside the saga
  middleware. Only getUserAction will be used in a React component.
*/

export const {
  getAllProductsAction,
  getProductsSuccessAction,
  getProductsErrorAction,
} = productsSlice.actions;

export default productsSlice.reducer;
