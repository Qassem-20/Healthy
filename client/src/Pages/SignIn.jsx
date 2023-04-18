import WelcomingNav from "../Components/WelcomingNav";
import { Container } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import UserStore from "../stores/UserStore.js";
import { useHistory } from "react-router-dom";

import React, { Fragment } from "react";

const SignIn = () => {
  const store = UserStore();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await store.loginUser();
      //Navigate
      history.push("/profile");
    } catch (err) {
      console.error(err.response.data);
      alert(
        `${err.response.data}, Please enter a valid login credentials, or sign up if you don't have an account`
      );
    }
  };
  return (
    <Fragment>
      <WelcomingNav />
      <Container className="mt-5 bg-white p-4 rounded  justify-content-center">
        <h2>Welcome to Healthy</h2>
        <form onSubmit={handleLogin}>
          <div>
            <InputForm
              label="Email:"
              placeholder="*******@gmail.com"
              type="email"
              name="email"
              value={store.loginFormUser.email}
              onChange={store.handleChangeLogin}
              errorMessage="userEmail"
              required={true}
            />
            <InputForm
              label="Password:"
              placeholder="****************"
              type="password"
              name="password"
              value={store.loginFormUser.password}
              onChange={store.handleChangeLogin}
              errorMessage="userPassword"
              required={true}
            />
            <div>
              <button className="btn btn-dark mt-2 bold" type="submit">
                Sign In
              </button>
              <p className="mt-3">
                Don’t have an Account? <a href="/signUp">Register</a>
              </p>
            </div>
          </div>
        </form>
      </Container>
    </Fragment>
  );
};

export default SignIn;
