import { Switch, Route } from "react-router-dom";

import WelcomePage from "./Pages/WelcomingPage";

import RequireAuthUser from "./Pages/RequireAuthUser";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

import React, { Fragment } from "react";

const AppRoute = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>

        <Route path="/signIn">
          <SignIn />
        </Route>

        <Route path="/signUp">
          <SignUp />
        </Route>

        <Route path="/profile">
          <RequireAuthUser>
            <Profile />
          </RequireAuthUser>
        </Route>

        <Route path="/dashboard">
          <RequireAuthUser>
            <Dashboard />
          </RequireAuthUser>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default AppRoute;
