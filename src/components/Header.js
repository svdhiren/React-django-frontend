import React from "react";
import {Container, Nav, Navbar, Row} from 'react-bootstrap'
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">MyShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link}  to="/cart">Cart <i className="fas fa-shopping-cart"></i></Nav.Link>
              <Nav.Link as={Link} to="/login"> Login <i className="fas fa-user"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
