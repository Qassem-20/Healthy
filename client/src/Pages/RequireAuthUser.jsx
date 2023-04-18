import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserStore from "../stores/UserStore";

export default function RequireAuthUser(props) {
  const store = UserStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, [store]);

  if (store.loggedIn === null) {
    return (
      <Container className="m-auto bg-white mt-5 signInWidth pt-3 pb-4 rounded shadow">
        <p>Checking if you logged In, Loading...</p>
      </Container>
    );
  }
  if (store.loggedIn === false) {
    return <Redirect to="/signIn" />;
  }
  return <div>{props.children}</div>;
}
