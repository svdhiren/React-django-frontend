import { configureStore } from "@reduxjs/toolkit";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
} from "./reducers/orderReducers";

//When the website gets reloaded, we have to fetch the cartItems from the
//local storage and add it to the initial state since store is initialized again when
//website gets reloaded.

// prettier-ignore
const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [];

// prettier-ignore
var userInfoFromStorage = null;
if (localStorage.getItem("userInfo") !== "undefined") {
    userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
} else console.log("userInfo is undefined...");
// const userInfoFromStorage = localStorage.getItem("userInfo") !== undefined? JSON.parse(localStorage.getItem("userInfo")): null;

const shippingAddr = localStorage.getItem("shippingAddr")
    ? JSON.parse(localStorage.getItem("shippingAddr"))
    : {};

const paymentMethod = localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "";

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddr: shippingAddr,
        paymentMethod: paymentMethod,
    },
    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

// Redux-thunk gets automatically added as a middleware
// If this is a single function, it will be directly used as the root reducer for the store.
// If it is an object of slice reducers, like {users : usersReducer, posts : postsReducer},
// configureStore will automatically create the root reducer by passing this object
// to the Redux combineReducers utility.
const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
    },
    preloadedState: initialState,
    devTools: true,
});

export default store;
