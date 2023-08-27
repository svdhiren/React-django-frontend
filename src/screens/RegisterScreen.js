import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(""); //Used when confirmPassword is different.

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    //This is a search parameter which indicates whether we have to redirect to a particular page.
    const redirect = searchParams.get("redirect")
        ? searchParams.get("redirect")
        : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) setMessage("Passwords do not match");
        else dispatch(register(name, email, password));
    };

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-4" controlId="passwordConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button className="mt-4" type="submit" variant="primary">
                    Register
                </Button>
            </Form>

            <div className=" my-3 d-inline-block">
                Already have an account?{"  "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                    Sign In
                </Link>
            </div>
        </FormContainer>
    );
}

export default RegisterScreen;
