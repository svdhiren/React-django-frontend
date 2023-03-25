import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { user_update_profile_reset } from "../reducers/userReducers";

function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(""); //Used when confirmPassword is different.

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) navigate("/login");
        else if (!user || !user.name || success) {
            dispatch(user_update_profile_reset());

            //If user is empty or when the profile is updated and result is 'success' is true
            //then we fetch the new details.
            dispatch(getUserDetails("profile"));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, navigate, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) setMessage("Passwords do not match");
        else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name: name,
                    email: email,
                    password: password,
                })
            );
            setMessage("");
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="email">
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
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="passwordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button className="mt-4" type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
}

export default ProfileScreen;
