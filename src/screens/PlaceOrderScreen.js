import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";

import Message from "../components/Message";
import CheckoutNav from "../components/CheckoutNav";

import { createOrder } from "../actions/orderActions";
import { order_create_reset } from "../reducers/orderReducers";

function PlaceOrderScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, order, error, success } = orderCreate;

    const cart = useSelector((state) => state.cart);
    const shippingAddr = JSON.parse(JSON.stringify(cart.shippingAddr));

    // prettier-ignore
    const itemsPrice = cart.cartItems.reduce((tot, item) => tot + item.price * item.qty, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number(0.05 * itemsPrice).toFixed(2);

    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`);
            dispatch(order_create_reset());
        }
    }, [success, navigate]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
                shippingAddr: shippingAddr,
                paymentMethod: cart.paymentMethod,
            })
        );
    };

    return (
        <div>
            <CheckoutNav
                isLogin={true}
                isShip={true}
                isPay={true}
                isOrder={true}
            />

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {shippingAddr.address}, {shippingAddr.city}
                                {"-"}
                                {shippingAddr.postalCode},{" "}
                                {shippingAddr.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>Method : {cart.paymentMethod}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordering Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">
                                    Your cart is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items total: </Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    {shippingPrice === 0 ? (
                                        <Col style={{ color: "green" }}>
                                            FREE
                                        </Col>
                                    ) : (
                                        <Col>${shippingPrice}</Col>
                                    )}
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="mt-4">
                                <Row>
                                    <Col>
                                        <b>Grand total: </b>
                                    </Col>
                                    <Col>
                                        <b>${totalPrice}</b>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className="col-12 btn btn-primary"
                                    size="lg"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrderScreen;
