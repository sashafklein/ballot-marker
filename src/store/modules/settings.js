import Immutable from 'immutable';

export default (state = Immutable.fromJS({}), action = {}) => {
  switch (action.type) {
    case 'CHANGE_SETTING': {
      return state.merge({ [action.setting]: action.value });
    }
    default: {
      return state;
    }
  }
};
