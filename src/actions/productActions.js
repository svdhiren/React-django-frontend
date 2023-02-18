import axios from "axios";
import {
  ProductList_request,
  ProductList_success,
  ProductList_fail,
  ProductDetails_request,
  ProductDetails_success,
  ProductDetails_fail,
} from "../reducers/productReducers";

export const listProducts = () => async (dispatch) => {
  try {
    console.log("In listProducts");
    dispatch(ProductList_request());

    const { data } = await axios.get("/api/products/");

    dispatch(ProductList_success(data));
  } catch (error) {
    console.log("Api request /api/products failed...");
    let msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ProductList_fail(msg));
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    console.log("In listProductDetails");
    dispatch(ProductDetails_request());

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch(ProductDetails_success(data));
  } catch (error) {
    console.log("Api request /api/product/:id failed...");
    let msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ProductDetails_fail(msg));
  }
};