import React, { useState, useEffect } from 'react';
import {
  signInWithEmailPasswordMethods,
  signInWithGoogle,
} from '../firebase/authMethods';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenItem = window.localStorage.token;
    console.log('tokenItem', tokenItem);
    if (tokenItem !== undefined) {
      setToken(tokenItem);
    } else {
      setToken(null);
    }
  },[]);

  const handleSignUp = () => {
    console.log('handleSignUp');
    // calling signUp from firebase server
    signInWithEmailPasswordMethods.signUp(
      inputs.email,
      inputs.password,
      setError,
      setToken,
    );
    console.log(error, token);
    setInputs({ email: '', password: '' });
  };

  const handleSignIn = () => {
    console.log('handleSignIn');
    // calling signIn from firebase server
    signInWithEmailPasswordMethods.signIn(
      inputs.email,
      inputs.password,
      setError,
      setToken,
    );
    console.log('error', token);
    setInputs({ email: '', password: '' });
  };

  const handleSignInWithGoogle = () => {
    console.log('handleSignInWithGoogle');
    signInWithGoogle(setError, setToken);
    console.log(error, token);
  };

  const handleSignOut = () => {
    signInWithEmailPasswordMethods.signOut(setError, setToken);
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleSignInWithGoogle,
        token,
        inputs,
        setInputs,
        error,
        handleSignOut,
        setToken,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
