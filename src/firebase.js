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
