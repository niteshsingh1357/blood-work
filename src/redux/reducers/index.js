import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  firebaseReducer,
  firestoreReducer,
  authReducer,
});
