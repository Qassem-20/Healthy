import { Container, Nav, Navbar } from "react-bootstrap";
import React, { Fragment } from "react";

const NavUser = () => {
  return (
    <Fragment>
      <Navbar expand="lg" className="pt-2 pb-3 mb-1 Nav">
        <Container>
          <Navbar.Brand>Healthy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavUser;
