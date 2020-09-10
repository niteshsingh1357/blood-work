import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/auth.css';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './components/Loader';
import LayoutComponent from './components/Layout';
import { auth } from 'firebase';
import { handleSignOut } from './redux/actions/auth';
import './styles/theme.scss';
import 'font-awesome/css/font-awesome.min.css';

const PrivateRoute = ({ auth, dispatch, component, ...rest }) => {
  const token = localStorage.getItem('token');
  if (token === 'null' || token === undefined) {
    // console.log(token);
    dispatch(handleSignOut());
    return <Redirect to='/signIn' />;
  } else {
    // console.log(token);

    return (
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
        <Route exact path='/' render={() => <Redirect to='/app/dashboard' />} />
        <Route
          exact
          path='/app'
          render={() => <Redirect to='/app/dashboard' />}
        />

        <PrivateRoute
          auth={auth}
          path='/app'
          dispatch={dispatch}
          component={Home}
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
