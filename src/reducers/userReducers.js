import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const user_login_request = createAction(USER_LOGIN_REQUEST);
export const user_login_success = createAction(USER_LOGIN_SUCCESS);
export const user_login_fail = createAction(USER_LOGIN_FAIL);
export const user_logout = createAction(USER_LOGOUT);

const userLoginInitialState = {};

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
      })
      .addCase(user_login_fail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(user_logout, (state, action) => {
        state = {};
      });
  }
);
