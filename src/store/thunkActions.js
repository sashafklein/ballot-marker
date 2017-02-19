import { fromJS } from 'immutable';

import { setVotes } from './actions';

export const straightPartyVote = (partyID, isSelected) => {
  return (dispatch, getState) => {
    const contests = getState().contests;
    const relevantContests = contests.filter(c => c.getIn(['options', 0, 'partyID']));
    const votes = {};

    relevantContests
      .forEach(contest => {
        const options = contest.get('options') || fromJS([]);
        const selections = [];
        if (isSelected) {
          const nextSelection = options.findIndex(opt => opt.get('partyID') === partyID);
          if (nextSelection !== -1) selections.push(nextSelection);
        }

        if (selections.length) {
          votes[contest.get('id')] = selections;
        }
      });

    return dispatch(setVotes(fromJS(votes)));
  };
};
