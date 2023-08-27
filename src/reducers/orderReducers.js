import { createAction, createReducer } from "@reduxjs/toolkit";

export const order_create_request = createAction("order_create_request");
export const order_create_success = createAction("order_create_success");
export const order_create_fail = createAction("order_create_fail");
export const order_create_reset = createAction("order_create_reset");

export const order_details_request = createAction("order_details_request");
export const order_details_success = createAction("order_details_success");
export const order_details_fail = createAction("order_details_fail");

export const order_pay_request = createAction("order_pay_request");
export const order_pay_success = createAction("order_pay_success");
export const order_pay_fail = createAction("order_pay_fail");
export const order_pay_reset = createAction("order_pay_reset");

const orderCreateInitialState = {};

const orderDetailsInitialState = {
    loading: true,
    order: {
        orderItems: [],
        shippingAddr: {},
    },
};

const orderPayInitialState = {};

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

export const orderDetailsReducer = createReducer(
    orderDetailsInitialState,
    (builder) => {
        builder
            .addCase(order_details_request, (state, action) => {
                state.loading = true;
            })
            .addCase(order_details_success, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(order_details_fail, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
);

export const orderPayReducer = createReducer(
    orderPayInitialState,
    (builder) => {
        builder
            .addCase(order_pay_request, (state, action) => {
                state.loading = true;
            })
            .addCase(order_pay_success, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(order_pay_fail, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(order_pay_reset, (state, action) => {
                return {};
            });
    }
);