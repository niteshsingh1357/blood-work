import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyChW1tHQbxR9ItHks197v0AkRzE5T31xEc',
  authDomain: 'blood-work-f65e4.firebaseapp.com',
  databaseURL: 'https://blood-work-f65e4.firebaseio.com',
  projectId: 'blood-work-f65e4',
  storageBucket: 'blood-work-f65e4.appspot.com',
  messagingSenderId: '276053928114',
  appId: '1:276053928114:web:a349f20415ebf2e54141ab',
  measurementId: 'G-81HFPFJHDX',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log(result);
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(error);
    });
};
