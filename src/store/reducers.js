import { fromJS } from 'immutable';

import { constructReducers } from './boilerplate';
import startingData from '../data/sample';

const settings = {
  _init: fromJS({ textSize: 'medium', colorScheme: 'full' }),
  CHANGE_SETTING: (state, action) => state.merge({ [action.setting]: action.value })
};

const errorMessage = {
  _init: null,
  SET_ERROR_MESSAGE: (state, action) => action.message
};

const data = {
  _init: fromJS(startingData.ElectionReport)
};


export const handlers = { errorMessage, data, settings };
export default constructReducers(handlers);
