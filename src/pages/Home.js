import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleSignOut } from '../redux/actions/auth';
import firebase from 'firebase';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';

const Home = ({ dispatch }) => {
  const signOut = () => {
    dispatch(handleSignOut());
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // console.log('user', user);
      }
    });
  });

  return (
    <div>
      <Layout signOut={signOut} />
    </div>
  );
};

export default connect()(Home);
