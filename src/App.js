import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './components/Loader';
import LayoutComponent from './components/Layout';
import { auth } from 'firebase';
import { handleSignOut } from './redux/actions/auth';
import './styles/theme.scss';
import 'font-awesome/css/font-awesome.min.css';

const PrivateRoute = ({ dispatch, auth, component, ...rest }) => {
  if (!auth.isEmpty) {
    dispatch(handleSignOut());
    return <Redirect to='/signIn' />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const App = ({ auth, dispatch }) => {
  // const { token } = useContext(firebaseAuth);
  // console.log('token', token);

  return (
    <div>
      {/* <HashRouter> */}
      <Switch>
        {/* <Route
        exact
        path='/'
        // component={Home}
        render={() =>
          !auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Home /> : <SignIn />
        }
      /> */}
        {/* <Route exact path='/' render={() => <Redirect to='/' />} /> */}
        <PrivateRoute
          path=''
          dispatch={dispatch}
          auth={auth}
          component={LayoutComponent}
        />

        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
      </Switch>
      {/* </HashRouter> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(App);
