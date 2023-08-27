import axios from "axios";

import {
    order_create_request,
    order_create_success,
    order_create_fail,
    order_details_request,
    order_details_success,
    order_details_fail,
    order_pay_request,
    order_pay_success,
    order_pay_fail,
} from "../reducers/orderReducers";

import { cart_clear_items } from "../reducers/cartReducers";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(order_create_request());

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // prettier-ignore
        const { data } = await axios.post(
            '/api/orders/add/',
            order,
            config
        );

        dispatch(order_create_success(data));

        //After order is successfully place, we have to clear the cart state and local storage.
        dispatch(cart_clear_items());
        localStorage.removeItem("cartItems");
    } catch (error) {
        console.log("Request /api/orders/add failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(order_create_fail(msg));
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(order_details_request());

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // prettier-ignore
        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        );

        dispatch(order_details_success(data));
    } catch (error) {
        console.log("Request /api/orders/:id/ failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(order_details_fail(msg));
    }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(order_pay_request());

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // prettier-ignore
        await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        );

        dispatch(order_pay_success());
    } catch (error) {
        console.log("Request /api/orders/:id/pay/ failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(order_pay_fail(msg));
    }
};