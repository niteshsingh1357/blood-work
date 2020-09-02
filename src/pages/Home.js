import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleSignOut } from '../redux/actions/auth';
import firebase from 'firebase';

const Home = ({ dispatch }) => {
  const signOut = () => {
    dispatch(handleSignOut());
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('user', user);
      }
    });
  });

  return (
    <div>
      <h1>Home</h1>
      <h3>Welcome, You are signed in.</h3>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default connect()(Home);
