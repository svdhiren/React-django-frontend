import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrderDetails, payOrder } from "../actions/orderActions";
import { order_pay_reset } from "../reducers/orderReducers";

const paymentOptions = {
    "client-id":
        "AXpOoyrcBANk2V42nPKPmVWggQ06vCDbkPmTfLgD7pDhhi70qlw_E8n-N4rn25eILyVPuP59MArIjTJQ",
    currency: "USD",
    intent: "capture",
    "enable-funding": ["card", "paylater"],
};

function OrderScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    // const [{ isPending }] = usePayPalScriptReducer();

    const [itemsPrice, setItemsPrice] = useState(0);
    // const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, order, error, success } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    // const addPayPalScript = () => {
    //     const script = document.createElement("script");
    //     script.type = "text/javascript";
    //     // 'src' will have the sdk url for rendering buttons.
    //     // Also add your cliend id to the url
    //     script.src = "";
    //     //We want this functionality to be async
    //     script.async = true;
    //     // We also want maintain and set the state when the sdk is ready.
    //     script.onload = () => {
    //         //Set the state that sdk is ready
    //         setSdkReady(true);
    //     };

    //     document.body.appendChild(script);
    // };

    useEffect(() => {
        if (!order || successPay || order._id !== Number(params.id)) {
            dispatch(order_pay_reset());
            dispatch(getOrderDetails(params.id));
            // prettier-ignore
            setItemsPrice(order.orderItems.reduce((tot, item) => tot + item.price * item.qty, 0).toFixed(2));
        }
        // else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript();
        //     } else setSdkReady(true);
        // }
    }, [order, params, successPay, dispatch]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order._id, paymentResult));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>Name : {order.user.name}</p>
                            <p>
                                Email :{" "}
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                {order.shippingAddress.address},{" "}
                                {order.shippingAddress.city}
                                {"-"}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered On : {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="warning">Processing</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>Method : {order.paymentMethod}</p>

                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid At : {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Payment pending
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, idx) => (
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
                                    {order.shippingPrice === 0 ? (
                                        <Col style={{ color: "green" }}>
                                            FREE
                                        </Col>
                                    ) : (
                                        <Col>${order.shippingPrice}</Col>
                                    )}
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="mt-4">
                                <Row>
                                    <Col>
                                        <b>Grand total: </b>
                                    </Col>
                                    <Col>
                                        <b>${order.totalPrice}</b>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    <PayPalScriptProvider
                                        options={paymentOptions}
                                    >
                                        <PayPalButtons
                                            style={{ layout: "horizontal" }}
                                            createOrder={async (
                                                data,
                                                actions
                                            ) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: order.totalPrice,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (
                                                data,
                                                actions
                                            ) => {
                                                // return actions.order
                                                //     .capture()
                                                //     .then((details) => {
                                                //         // prettier-ignore
                                                //         const name = details.payer.name.given_name;
                                                //         alert(
                                                //             `Transaction completed by ${name}`
                                                //         );
                                                //     });
                                                const details =
                                                    await actions.order.capture();
                                                // prettier-ignore
                                                const name = details.payer.name.given_name;
                                                successPaymentHandler(true);
                                                alert(
                                                    `Transaction completed by ${name}`
                                                );
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
