import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PublicRoute from './services/PublicRoute';
import PrivateRoute from './services/PrivateRoute';
import Login from './scenes/Login';
import Dashboard from './scenes/Dashboard';
import Users from './scenes/Admin/Users';
import UserAdd from './scenes/Admin/UserAdd';
import NotFound from './scenes/NotFound';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/dashboard" />
      </Route>
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/login/:email" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path="/admin/adduser" component={UserAdd} />
      <PublicRoute component={NotFound} />
    </Switch>
  </Router>
);

export default App;


