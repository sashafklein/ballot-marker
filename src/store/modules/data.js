import Immutable from 'immutable';
import startingData from '@data/sample';

export default (state = Immutable.fromJS(startingData.ElectionReport), action = {}) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
