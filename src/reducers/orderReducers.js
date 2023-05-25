import { createAction, createReducer } from "@reduxjs/toolkit";

export const order_create_request = createAction("order_create_request");
export const order_create_success = createAction("order_create_success");
export const order_create_fail = createAction("order_create_fail");
export const order_create_reset = createAction("order_create_reset");

const orderCreateInitialState = {};

export const orderCreateReducer = createReducer(
    orderCreateInitialState,
    (builder) => {
        builder
            .addCase(order_create_request, (state, action) => {
                state.loading = true;
            })
            .addCase(order_create_success, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(order_create_fail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(order_create_reset, (state, action) => {
                return {};
            });
    }
);
