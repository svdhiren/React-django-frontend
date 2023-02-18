import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

//When the website gets reloaded, we have to fetch the cartItems from the
//local storage and add it to the initial state since store is initialized again when
//website gets reloaded.

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems"))
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
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
  },
  preloadedState: initialState,
  devTools: true,
});

export default store;
