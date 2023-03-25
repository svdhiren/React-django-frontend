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
    user_details_request,
    user_details_success,
    user_details_fail,
    user_details_reset,
    user_update_profile_request,
    user_update_profile_success,
    user_update_profile_fail,
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
    dispatch(user_details_reset());
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

export const getUserDetails = (id) => async (dispatch, getState) => {
    //Depending on the usage value of the parameter 'id' will be 'profile' (request then becomes /api/users/profile)
    //OR the actual id (request then becomes /api/users/<id>)
    try {
        dispatch(user_details_request());

        //We have to send the token along with get request.
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
            `/api/users/${id}`,
            config
        );

        dispatch(user_details_success(data));
    } catch (error) {
        console.log("Request /api/users/ failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(user_details_fail(msg));
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(user_update_profile_request());

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
        const { data } = await axios.put(
            '/api/users/profile/update/',
            user,
            config
        );

        dispatch(user_update_profile_success(data));

        //We also want to login the user with the new information
        dispatch(user_login_success(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        console.log("Request /api/users/ failed...");
        let msg =
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        dispatch(user_update_profile_fail(msg));
    }
};