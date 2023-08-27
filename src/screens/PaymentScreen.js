import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutNav from "../components/CheckoutNav";

import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const shippingAddr = useSelector((state) => state.cart.shippingAddr);
    const [paymentMethod, setPayment] = useState("PayPal");

    if (!shippingAddr.address) {
        navigate("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutNav isLogin={true} isShip={true} isPay={true} />
            {/* <h2>Payment Method</h2> */}

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    {/* <Col> */}
                    <Form.Check
                        type="radio"
                        id="payment"
                        name="paymentMethod"
                        label="PayPal or Credit Card"
                        checked
                        onChange={(e) => setPayment(e.target.value)}
                    ></Form.Check>
                    {/* </Col> */}
                </Form.Group>

                <Button className="mt-4" type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
