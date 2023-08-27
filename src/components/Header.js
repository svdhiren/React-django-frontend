import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    //Showing the current user logged in the navbar and dropdown option to log out.

    const logoutHandler = () => {
          dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        MyShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                    >
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/cart">
                                Cart <i className="fas fa-shopping-cart"></i>
                            </Nav.Link>

                            {userInfo ? (
                                <NavDropdown
                                    className="navbar-right"
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <NavDropdown.Item as={Link} to="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to="/login">
                                    {" "}
                                    Login <i className="fas fa-user"></i>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
