import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

import promiseMiddleware from './middlewares/promiseMiddleware';
import reducers from './reducers';

// Reactotron.configure()
//   .use(reactotronRedux())
//   .connect({ name: 'Ballot Marker' });

const enhancer = compose(
  applyMiddleware(
    reduxThunkMiddleware,
    promiseMiddleware
    // Reactotron.reduxMiddleware
  ),
);

export default function configureStore(initialState) {
  const storeCreator = __DEV__ ? createStore : createStore;

  const store = storeCreator(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  );

  return store;
}
