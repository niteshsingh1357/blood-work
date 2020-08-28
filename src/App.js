import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/auth.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' >
          <Login />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
