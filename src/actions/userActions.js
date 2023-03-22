import axios from "axios";
import {
    user_login_request,
    user_login_success,
    user_login_fail,
    user_logout,
    user_register_request,
    user_register_success,
    user_register_fail,
    user_register_logout,
} from "../reducers/userReducers";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(user_login_request());

        const config = {
            header: {
                "content-type": "application/json",
            },
        };
        // prettier-ignore
        const { data } = await axios.post(
            "/api/users/login",
            {
                username: email,
                password: password,
            },
            config
        );
        dispatch(user_login_success(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        console.log("Request /api/users/login failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(user_login_fail(msg));
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");

    dispatch(user_logout());
    dispatch(user_register_logout());
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch(user_register_request());

        const config = {
            header: {
                "content-type": "application/json",
            },
        };
        // prettier-ignore
        const { data } = await axios.post(
            "/api/users/register/",
            {
                name: name,
                email: email,
                password: password,
            },
            config
        );

        dispatch(user_register_success(data));

        //We want the user to automatically login as soon as he registers.
        dispatch(user_login_success(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        console.log("Request /api/users/register failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(user_register_fail(msg));
    }
};