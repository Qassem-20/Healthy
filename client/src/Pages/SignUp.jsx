import WelcomingNav from "../Components/WelcomingNav";
import { Container } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import UserStore from "../stores/UserStore.js";
import { useHistory } from "react-router-dom";

import React, { Fragment } from "react";

const SignUp = () => {
  const store = UserStore();
  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await store.registerUser();
      history.push("/signIn");
    } catch (err) {
      console.error(err);
      alert(`${err.response}this email already registered`);
    }
  };
  return (
    <Fragment>
      <WelcomingNav />
      <Container className="mt-5 bg-white p-4 rounded  justify-content-center">
        <h2>Welcome to Healthy</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <InputForm
              label="Name:"
              placeholder="Qassem"
              name="name"
              value={store.values.name}
              onChange={store.handleChange}
              errorMessage="full_name"
              required={true}
            />
            <InputForm
              label="Email:"
              placeholder="*******@gmail.com"
              name="email"
              value={store.values.email}
              onChange={store.handleChange}
              errorMessage="email"
              required={true}
            />
            <InputForm
              label="Password:"
              type="password"
              placeholder="****************"
              name="password"
              value={store.values.password}
              onChange={store.handleChange}
              errorMessage="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              required={true}
            />
          </div>
          <button className="btn btn-dark mt-2 bold" type="submit">
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          Already have an Account? <a href="/signIn">Log In</a>
        </p>
      </Container>
    </Fragment>
  );
};

export default SignUp;
