import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleSignOut } from '../redux/actions/auth';
import firebase from 'firebase';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

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
      <Navbar dispatch={dispatch} signOut={signOut} />
      <Sidebar />
    </div>
  );
};

export default connect()(Home);
