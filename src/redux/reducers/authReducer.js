import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  BEGIN_API_CALL,
  END_API_CALL,
} from '../actions/actionTypes';

import { combineReducers } from 'redux';

const INITIAL_STATE = {
  token: null,
  error: null,
};

const apiCallStatus = (
  state = {
    apiCallInProgress: 0,
  },
  action,
) => {
  switch (action.type) {
    case BEGIN_API_CALL:
      return { ...state, apiCallInProgress: 1 };
    case END_API_CALL:
      return { ...state, apiCallInProgress: 0 };
    default:
      return state;
  }
};

const signUp = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, token: action.token };
    case SIGNUP_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const signIn = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, token: action.token };
    case SIGNIN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const signOut = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNOUT_SUCCESS:
      return { ...state, token: null, error: null };
    case SIGNOUT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  apiCallStatus,
  signUp,
  signIn,
  signOut
});

export default rootReducer;
