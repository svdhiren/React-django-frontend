import axios from "axios";

import { cart_add_item, cart_remove_item } from "../reducers/cartReducers";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  //getState can be used to get access to entire state
  //just in case you want to use it in your action.

  const { data } = await axios.get(`/api/product/${id}`);

  dispatch(
    cart_add_item({
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty: qty,
    })
  );

  //Now that state has been updates, we will also add it to the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cart_remove_item(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};