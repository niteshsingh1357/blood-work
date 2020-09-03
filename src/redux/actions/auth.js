import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  BEGIN_API_CALL,
  END_API_CALL,
} from './actionTypes';

import firebase from '../../firebase/firebaseIndex';

// initialize firebase auth
const auth = firebase.auth();
const google_provider = new firebase.auth.GoogleAuthProvider();
const facebook_provider = new firebase.auth.FacebookAuthProvider();
facebook_provider.addScope('email');

export const beginApiCall = () => {
  return {
    type: BEGIN_API_CALL,
  };
};

export const endApiCall = () => {
  return {
    type: END_API_CALL,
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token,
  };
};

export const signUpError = (error) => {
  return {
    type: SIGNUP_ERROR,
    error,
  };
};

export const signInSuccess = (token) => {
  return {
    type: SIGNIN_SUCCESS,
    token,
  };
};

export const signInError = (error) => {
  return {
    type: SIGNIN_ERROR,
    error,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

export const signOutError = (error) => {
  return {
    type: SIGNOUT_ERROR,
    error,
  };
};

export const handleSignUp = (email, password) => async (dispatch) => {
  console.log('handleSignUpAction', email, password);
  dispatch(beginApiCall());
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      const token = await Object.entries(res.user)[5][1].b;
      dispatch(signUpSuccess(token));
      // set token to localStorage
      localStorage.setItem('token', token);
    })
    .catch((error) => {
      dispatch(endApiCall());
      dispatch(signUpError(error.message));
    });
};

export const handleSignIn = (email, password) => async (dispatch) => {
  console.log('handleSignUpAction', email, password);
  dispatch(beginApiCall());
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      const token = await Object.entries(res.user)[5][1].b.g;
      dispatch(signInSuccess(token));
    })
    .catch((error) => {
      dispatch(endApiCall());
      dispatch(signInError(error.message));
    });
};

// Signing out with Firebase
export const handleSignOut = () => async (dispatch) => {
  try {
    dispatch(beginApiCall());
    auth
      .signOut()
      .then(() => {
        dispatch(endApiCall());
        dispatch(signOutSuccess());
      })
      .catch((error) => {
        dispatch(endApiCall());
        dispatch(signOutError(error.message));
      });
  } catch (error) {
    dispatch(endApiCall());
    dispatch(signOutError(error.message));
  }
};

// sign in with Google method
export const handleSignInWithGoogle = () => async (dispatch) => {
  auth
    .signInWithPopup(google_provider)
    .then(async (result) => {
      const token = await result.credential.accessToken;
      dispatch(signInSuccess(token));
    })
    .catch((error) => {
      dispatch(endApiCall());
      dispatch(signInError(error.message));
    });
};

// sign in with Facebook method
export const handleSignInWithFacebook = () => async (dispatch) => {
  try {
    dispatch(beginApiCall());
    auth
      .signInWithPopup(facebook_provider)
      .then(async (result) => {
        const token = await result.credential.accessToken;
        dispatch(signInSuccess(token));
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log(error, errorCode, errorMessage, email, credential);
        dispatch(endApiCall());
        dispatch(signInError(error.message));
      });
  } catch (err) {
    console.log(err);
  }
};

// Anonymous sign in method
export const handleAnonymousSignIn = () => async (dispatch) => {
  auth
    .signInAnonymously()
    .then(async (result) => {
      const token = await result.credential.accessToken;
      dispatch(signInSuccess(token));
    })
    .catch((error) => {
      dispatch(endApiCall());
      dispatch(signInError(error.message));
    });
};
