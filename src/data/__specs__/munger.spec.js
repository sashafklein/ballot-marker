/* eslint no-unused-expressions:0 */

import { fromJS } from 'immutable';
import startingData from '../sample';

import { stitchTogetherContests } from '../munger';

const allData = fromJS(startingData.ElectionReport);
const contests = allData.getIn(['Election', 'ContestCollection', 'Contest']);
const parties = allData.getIn(['PartyCollection', 'Party']);
const candidates = allData.getIn(['Election', 'CandidateCollection', 'Candidate']);

const assertAttr = (obj, attr) => {
  const found = obj.get(attr);
  if (found === undefined || found === null) {
    console.error(`Expected obj to have attr '${attr} : ${obj}`);
    expect(obj.get(attr)).to.exist;
  }
};

const runContestTest = (contest, contestAttrs, optionAttrs, mandateOptions = true) => {
  contestAttrs.forEach(attr => assertAttr(contest, attr));

  const firstOption = contest.getIn(['options', 0]);
  if (firstOption) {
    optionAttrs.forEach(attr => assertAttr(firstOption, attr));
  } else if (mandateOptions) {
    console.error(contest);
    throw new Error('Expected contest to have options, but had none.');
  } else {
    console.error('Contest found without options:', contest);
  }
};

describe('stitchTogetherContests', () => {
  let stitched;

  beforeEach(() => {
    stitched = stitchTogetherContests(contests, parties, candidates);
  });

  it('handles candidate contests correctly', () => {
    stitched.filter(c => c.get('type') === 'CandidateContest').forEach(contest => {
      runContestTest(
        contest,
        ['name', 'id', 'voteLimit', 'index'],
        ['name', 'partyName', 'partyID', 'id', 'index'],
        false
      );
    });
  });

  it('handles ballot measure contests correctly', () => {
    stitched.filter(c => c.get('type') === 'BallotMeasureContest').forEach(contest => {
      runContestTest(
        contest,
        ['name', 'electoralDistrictID', 'text', 'id', 'voteLimit', 'index'],
        ['name', 'id', 'index']
      );
    });
  });

  it('handles party contests correctly', () => {
    stitched.filter(c => c.get('type') === 'PartyContest').forEach(contest => {
      runContestTest(
        contest,
        ['type', 'name', 'voteLimit', 'electoralDistrictID', 'id', 'index'],
        ['name', 'abbreviation', 'id', 'index']
      );
    });
  });

  it('does not lose anything', () => {
    expect(stitched.size).to.eq(contests.size);
  });
});
