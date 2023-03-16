import React, { useState, useEffect } from "react";
import {
    Link,
    useParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { login } from "../actions/userActions";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    //This is a search parameter which indicates whether we have to redirect to a particular page.
    const redirect = searchParams.get("redirect")
        ? searchParams.get("redirect")
        : "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    // If the user is already logged in, then the user must not log in again. So, we redirect
    // to the page indicated by redirect.

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form submitted...");
        dispatch(login(email, password));
    };
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className="mt-4" type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
            {/* my-3 means : A margin of 3px in y axis both top and bottom */}
            {/* <Row className=" my-3 d-inline-block"> */}
            <div className=" my-3 d-inline-block">
                New customer?{"  "}
                <Link
                    to={
                        redirect
                            ? `/register/redirect=${redirect}`
                            : "/register"
                    }
                >
                    Register
                </Link>
            </div>

            {/* </Row> */}
        </FormContainer>
    );
}

export default LoginScreen;
