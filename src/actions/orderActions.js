import axios from "axios";

import {
    order_create_request,
    order_create_success,
    order_create_fail,
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
