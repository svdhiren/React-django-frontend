import { createAction, createReducer } from "@reduxjs/toolkit";

const cartInitialState = {
    cartItems: [],
    shippingAddr: {},
};

export const cart_add_item = createAction("cart_add_item");
export const cart_remove_item = createAction("cart_remove_item");
export const cart_save_shipping_addr = createAction("cart_save_shipping_addr");
export const cart_save_payment_method = createAction(
    "cart_save_payment_method"
);
export const cart_clear_items = createAction("cart_clear_items");

export const cartReducer = createReducer(cartInitialState, (builder) => {
    builder
        .addCase(cart_add_item, (state, action) => {
            const item = action.payload;

            //Here 'product' attribute refers to the id.
            const idx = state.cartItems.findIndex(
                (a) => a.product === item.product
            );

            if (idx !== -1) state.cartItems[idx] = item;
            else state.cartItems.push(item);
        })
        .addCase(cart_remove_item, (state, action) => {
            const id = action.payload;

            const idx = state.cartItems.findIndex((a) => a.product === id);
            state.cartItems.splice(idx, 1);
        })
        .addCase(cart_save_shipping_addr, (state, action) => {
            state.shippingAddr = JSON.parse(JSON.stringify(action.payload));
        })
        .addCase(cart_save_payment_method, (state, action) => {
            state.paymentMethod = action.payload;
        })
        .addCase(cart_clear_items, (state, action) => {
            state.cartItems = [];
        });
});
