/* eslint no-unused-expressions:0 */

import { fromJS } from 'immutable';
import startingData from '../sample';

import { stitchTogetherContests } from '../munger';

const allData = fromJS(startingData.ElectionReport);

describe('stitchTogetherContests', () => {
  it('handles data correctly', () => {
    const contests = allData.getIn(['Election', 'ContestCollection', 'Contest']);
    const parties = allData.getIn(['PartyCollection', 'Party']);
    const candidates = allData.getIn(['Election', 'CandidateCollection', 'Candidate']);

    expect(contests.size).not.to.eq(0);
    expect(parties.size).not.to.eq(0);
    expect(candidates.size).not.to.eq(0);

    const result = stitchTogetherContests(contests, parties, candidates);
    result.forEach(contest => {
      expect(
        ['PartyContest', 'CandidateContest', 'BallotMeasureContest']
          .includes(contest.get('type'))
      ).to.eq(true);

      expect(contest.get('voteLimit')).to.exist;

      contest.get('options').forEach(option => {
        expect(option.get('id')).to.exist;
        expect(option.get('name')).to.exist;
      });
    });
  });
});
