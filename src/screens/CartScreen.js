import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  FormControl,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Message } from "../components/Message";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems : ", cartItems);

  const productId = params.id;
  const qty = searchParams.get("qty");

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  //   console.log("qty : ", qty);

  return <div>Cart</div>;
}

export default CartScreen;
