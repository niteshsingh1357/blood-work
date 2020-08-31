import React, { useContext, useEffect, useState } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import firebase from 'firebase';

const Home = (props) => {
  const { handleSignOut, token } = useContext(firebaseAuth);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('user', user.providerData[0]);
        setUserData(user.providerData[0]);
      }
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h3>Welcome {userData.uid}, You are signed in.</h3>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;