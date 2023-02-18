import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

const ProductListInitialState = { products: [] };

export const ProductList_request = createAction(PRODUCT_LIST_REQUEST);
export const ProductList_success = createAction(PRODUCT_LIST_SUCCESS);
export const ProductList_fail = createAction(PRODUCT_LIST_FAIL);

export const productListReducer = createReducer(
  ProductListInitialState,
  (builder) => {
    builder
      .addCase(ProductList_request, (state, action) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(ProductList_success, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(ProductList_fail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

const ProductDetailsInitialState = {
  product: {
    reviews: [],
  },
};

export const ProductDetails_request = createAction(PRODUCT_DETAILS_REQUEST);
export const ProductDetails_success = createAction(PRODUCT_DETAILS_SUCCESS);
export const ProductDetails_fail = createAction(PRODUCT_DETAILS_FAIL);

export const productDetailsReducer = createReducer(
  ProductDetailsInitialState,
  (builder) => {
    builder
      .addCase(ProductDetails_request, (state, action) => {
        state.loading = true;
      })
      .addCase(ProductDetails_success, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(ProductDetails_fail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
