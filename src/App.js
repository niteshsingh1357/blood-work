import React, { useContext } from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/auth.css';
import { Switch, Route } from 'react-router-dom';
import { firebaseAuth } from './provider/AuthProvider';

const App = () => {
  const { token, setToken } = useContext(firebaseAuth);
  console.log('token', token);


  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(rProps) => (token === null ? <SignIn /> : <Home />)}
      />
      <Route exact path='/signIn' component={SignIn} />
      <Route exact path='/signUp' component={SignUp} />
    </Switch>
  );
};

export default App;
