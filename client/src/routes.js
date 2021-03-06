import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import UserDashboard from "./components/user";
import Layout from "./hoc/layout";
import Buy from "./components/user/buy";
import Sell from "./components/user/sell";
import Bids from "./components/user/bids";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/userdashboard/buy" exact component={Buy} />
        <Route path="/userdashboard/sell" exact component={Sell} />
        <Route path="/userdashboard/bids" exact component={Bids} />
        <Route path="/userdashboard" exact component={UserDashboard} />
        <Route path="/" exact component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
