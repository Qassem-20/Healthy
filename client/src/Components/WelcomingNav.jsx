import { Container, Nav, Navbar } from "react-bootstrap";
import React, { Fragment } from "react";

const WelcomingNav = () => {
  return (
    <Fragment>
      <Navbar expand="lg" className="pt-2 pb-3 mb-5 Nav">
        <Container>
          <Navbar.Brand href="/">Healthy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/signUp">Sign Up</Nav.Link>
              <Nav.Link href="/signIn">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default WelcomingNav;
