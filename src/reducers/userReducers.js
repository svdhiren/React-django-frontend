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

export const user_details_request = createAction("USER_DETAILS_REQUEST");
export const user_details_success = createAction("USER_DETAILS_SUCCESS");
export const user_details_fail = createAction("USER_DETAILS_FAIL");
export const user_details_reset = createAction("USER_DETAILS_RESET");

export const user_update_profile_request = createAction(
    "USER_UPDATE_PROFILE_REQUEST"
);
export const user_update_profile_success = createAction(
    "USER_UPDATE_PROFILE_SUCCESS"
);
export const user_update_profile_fail = createAction(
    "USER_UPDATE_PROFILE_FAIL"
);
export const user_update_profile_reset = createAction(
    "USER_UPDATE_PROFILE_RESET"
);

const userLoginInitialState = {};
const userRegisterInitialState = {};
const userDetailsInitialState = {
    user: {},
};
const userUpdateProfileInitialState = {};

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

export const userDetailsReducer = createReducer(
    userDetailsInitialState,
    (builder) => {
        builder
            .addCase(user_details_request, (state, action) => {
                state.loading = true;
            })
            .addCase(user_details_success, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(user_details_fail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(user_details_reset, (state, action) => {
                return {
                    user: {},
                };
            });
    }
);

export const userUpdateProfileReducer = createReducer(
    userUpdateProfileInitialState,
    (builder) => {
        builder
            .addCase(user_update_profile_request, (state, action) => {
                return { loading: true };
            })
            .addCase(user_update_profile_success, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(user_update_profile_fail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(user_update_profile_reset, (state, action) => {
                return {};
            });
    }
);
