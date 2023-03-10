import { createAction, createReducer } from "@reduxjs/toolkit";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const cartInitialState = {
  cartItems: [],
};

export const cart_add_item = createAction(CART_ADD_ITEM);
export const cart_remove_item = createAction(CART_REMOVE_ITEM);

export const cartReducer = createReducer(cartInitialState, (builder) => {
  builder
    .addCase(cart_add_item, (state, action) => {
      const item = action.payload;

      //Here 'product' attribute refers to the id.
      const idx = state.cartItems.findIndex((a) => a.product === item.product);

      if (idx !== -1) state.cartItems[idx] = item;
      else state.cartItems.push(item);
    })
    .addCase(cart_remove_item, (state, action) => {
      const id = action.payload;

      const idx = state.cartItems.findIndex((a) => a.product === id);
      state.cartItems.splice(idx, 1);
    });
});
