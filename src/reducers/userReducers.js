import { createAction, createReducer } from "@reduxjs/toolkit";

export const user_login_request = createAction("USER_LOGIN_REQUEST");
export const user_login_success = createAction("USER_LOGIN_SUCCESS");
export const user_login_fail = createAction("USER_LOGIN_FAIL");
export const user_logout = createAction("USER_LOGOUT");

export const user_register_request = createAction("USER_REGISTER_REQUEST");
export const user_register_success = createAction("USER_REGISTER_SUCCESS");
export const user_register_fail = createAction("USER_REGISTER_FAIL");

//Before we were clearing only userLogin state when the user logs out.
//Used to clear userInfo in the userRegister when the user logs out just after registering.
export const user_register_logout = createAction("USER_REGISTER_LOGOUT");

const userLoginInitialState = {};
const userRegisterInitialState = {};

export const userLoginReducer = createReducer(
    userLoginInitialState,
    (builder) => {
        builder
            .addCase(user_login_request, (state, action) => {
                state.loading = true;
            })
            .addCase(user_login_success, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(user_login_fail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(user_logout, (state, action) => {
                //If we just state as {}, the state is actually not updating.
                //So we just return the new state.
                return {};
            });
    }
);

export const userRegisterReducer = createReducer(
    userRegisterInitialState,
    (builder) => {
        builder
            .addCase(user_register_request, (state, action) => {
                state.loading = true;
            })
            .addCase(user_register_success, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(user_register_fail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(user_register_logout, (state, action) => {
                return {};
            });
    }
);
