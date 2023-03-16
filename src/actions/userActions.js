import axios from "axios";
import {
    user_login_request,
    user_login_success,
    user_login_fail,
    user_logout,
} from "../reducers/userReducers";

export const login = (email, password) => async (dispatch) => {
    try {
        console.log("In user login...");
        dispatch(user_login_request());

        const config = {
            header: {
                "content-type": "application/json",
            },
        };
        console.log("email : ", email);
        console.log("password : ", password);
        // prettier-ignore
        const { data } = await axios.post(
            "/api/users/login",
            {
                'username': email,
                'password': password,
            },
            config
        );
        console.log("Data after login : ", data);
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
