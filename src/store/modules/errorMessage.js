export default (state = null, action = {}) => {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE': {
      return action.message;
    }
    default: {
      return state;
    }
  }
};
