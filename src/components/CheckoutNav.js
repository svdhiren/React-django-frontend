import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CheckoutNav({ isLogin, isShip, isPay, isOrder }) {
    return (
        <Nav fill className="justify-content-center mb-4">
            <Nav.Link as={Link} to="/login" disabled={!isLogin}>
                Login
            </Nav.Link>
            <Nav.Link as={Link} to="/shipping" disabled={!isShip}>
                Shipping
            </Nav.Link>
            <Nav.Link as={Link} to="/payment" disabled={!isPay}>
                Payment
            </Nav.Link>
            <Nav.Link as={Link} to="/placeorder" disabled={!isOrder}>
                Place Order
            </Nav.Link>
        </Nav>
    );
}

export default CheckoutNav;
