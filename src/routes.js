import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Details from 'pages/Details';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/country/:slug">
          <Details />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
