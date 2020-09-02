import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/auth.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './components/Loader';

const App = ({ auth }) => {
  // const { token } = useContext(firebaseAuth);
  // console.log('token', token);

  return (
    <Switch>
      <Route
        exact
        path='/'
        // component={Home}
        render={() => 
          !auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Home /> : <SignIn />
        }
      />
      <Route exact path='/signIn' component={SignIn} />
      <Route exact path='/signUp' component={SignUp} />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(App);
