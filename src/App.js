import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Employees from './components/Employees';
import Home from './components/Home';
import Login from './components/Login';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/employees'>
          <Employees />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
