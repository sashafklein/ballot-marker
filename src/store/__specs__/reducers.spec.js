/* eslint no-console:0, max-len:0 */

import { fromJS } from 'immutable';

import { handlers } from '../reducers';
import { setVote, setVotes } from '../actions';

const { selections } = handlers;

const testHandler = (reducer, arrayOfActionsAndResultingState, init) => {
  let lastState = init;
  arrayOfActionsAndResultingState.forEach((obj, ind) => {
    const { action, state } = obj;
    const newState = reducer[action.type](lastState, action);
    const isEqual = newState.equals(state);
    if (!isEqual) {
      console.error(`
        State unequal at index ${ind}!
          - Expected: ${state}
          - Was:      ${newState}
      `);
    }
    expect(isEqual).to.eq(true);
    lastState = newState;
  });
};

describe('selections', () => {
  describe('SET_VOTE', () => {
    testHandler(selections, [
      { action: setVote('id1', [0, 1]), state: fromJS({ id1: [0, 1] }) },
      { action: setVote('id2', [2, 3]), state: fromJS({ id1: [0, 1], id2: [2, 3] }) },
      { action: setVote('id1', [3]), state: fromJS({ id1: [3], id2: [2, 3] }) }
    ], fromJS({}));
  });

  describe('SET_VOTES', () => {
    testHandler(selections, [
      { action: setVotes(fromJS({ id1: [3], id2: [2, 3] })), state: fromJS({ id1: [3], id2: [2, 3] }) },
      { action: setVotes(fromJS({ id1: [4], id2: [1, 3], id3: [1] })), state: fromJS({ id1: [4], id2: [1, 3], id3: [1] }) }
    ], fromJS({}));
  });
});
