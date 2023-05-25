import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutNav from "../components/CheckoutNav";

import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const shippingAddr = cart.shippingAddr;
    const [address, setAddress] = useState(shippingAddr.address);
    const [city, setCity] = useState(shippingAddr.city);
    const [postalCode, setPostalCode] = useState(shippingAddr.postalCode);
    const [country, setCountry] = useState(shippingAddr.country);

    // console.log("Address state : ", address);
    // console.log("Address direct : ", shippingAddr.address);
    // console.log("Shipping Address in shipping screen: ", shippingAddr);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutNav isLogin={true} isShip={true} />
            <h2>Shipping details</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-4">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
