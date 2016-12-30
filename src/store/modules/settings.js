import Immutable from 'immutable';

const seedSettings = {
  textSize: 'small',
  colorScheme: 'full'
};

export default (state = Immutable.fromJS(seedSettings), action = {}) => {
  switch (action.type) {
    case 'CHANGE_SETTING': {
      return state.merge({ [action.setting]: action.value });
    }
    default: {
      return state;
    }
  }
};
