import React from 'react';
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { fromJS } from 'immutable';

import createStore from '../store/create';
import scenes from './scenes';

const store = createStore();

if (window) {
  window._ = _;
  window.fromJS = fromJS;
}

const Kernel = () => {
  return (
    <Provider store={store}>
      <Router scenes={scenes} />
    </Provider>
  );
};

export default Kernel;
