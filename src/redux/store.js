// Setting up Redux Store
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger();

// const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
//   createStore,
// );

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );
}
