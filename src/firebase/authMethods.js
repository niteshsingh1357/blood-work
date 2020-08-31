import firebase from 'firebase';
// eslint-disable-next-line no-unused-vars
import firebaseConfig from './firebaseIndex';

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

// sign in with Google method
export const signInWithGoogle = (setError, setToken) => {
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      const token = await result.credential.accessToken;

      localStorage.setItem('token', token);
      setToken(token);
      console.log(result.user);
      console.log('token',token);
      setError(null);
    })
    .catch((err) => {
      console.log(err);
      setError(err.message);
    });
};

export const signInWithEmailPasswordMethods = {
  // firebase helper methods...
  signUp: (email, password, setError, setToken) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        // set token to localStorage
        localStorage.setItem('token', token);
        // set token to state
        setToken(token);
        console.log(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  },
  signIn: (email, password, setError, setToken) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;

        // set token to localStorage
        localStorage.setItem('token', token);

        // grab token from localStorage and set to state
        setToken(window.localStorage.token);

        console.log(res);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  },
  signOut: (setError, setToken) => {
    auth
      .signOut()
      .then((res) => {
        localStorage.removeItem('token');
        setToken(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem('token');
        setToken(null);
      });
  },
};
