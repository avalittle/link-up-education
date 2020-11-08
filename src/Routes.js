import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Browse from './components/browse/Browse';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/matches" component={Home} />
        </Switch>
    );
}