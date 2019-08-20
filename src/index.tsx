import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { ReusableProvider } from "reusable";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import MainPage from "./containers/MainPage";
import NodesPage from "./containers/NodesPage";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

const routing = (
  <ReusableProvider>
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        <Route path="/main" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/nodes" component={NodesPage} />
      </Switch>
    </HashRouter>
  </ReusableProvider>
);

ReactDOM.render(routing, document.getElementById("root"));

// use this with protected routes
/*
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/searchDashboard"/>
  ) : (
    <Redirect to="/login"/>
  )
)}/>
*/
