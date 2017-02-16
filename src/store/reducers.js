import { fromJS } from 'immutable';

import { constructReducers } from './boilerplate';
import startingData from '../data/sample';
import { stitchTogetherContests } from '../data/munger';

const settings = {
  _init: fromJS({ textSize: 'medium', colorScheme: 'full' }),
  CHANGE_SETTING: (state, action) => state.merge({ [action.setting]: action.value })
};

const errorMessage = {
  _init: null,
  SET_ERROR_MESSAGE: (state, action) => action.message
};

const allData = fromJS(startingData.ElectionReport);

const metaData = {
  _init: fromJS({
    type: allData.getIn(['Election', 'Type']),
    fullTitle: allData.getIn(['Election', 'Name', 'Text', '__text']),
    city: allData.getIn(['Issuer']),
    area: allData.getIn(['IssuerAbbreviation']),
  })
};

const contests = {
  _init: stitchTogetherContests(
    allData.getIn(['Election', 'ContestCollection', 'Contest']),
    allData.getIn(['PartyCollection', 'Party']),
    allData.getIn(['Election', 'CandidateCollection', 'Candidate'])
  )
};

const selections = {
  _init: fromJS([]),
  SET_VOTE: (state, action) => state.set(action.contestIndex, action.selections)
};

export const handlers = { errorMessage, contests, metaData, settings, selections };
export default constructReducers(handlers);
