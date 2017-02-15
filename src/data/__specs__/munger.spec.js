/* eslint no-unused-expressions:0 */

import { fromJS } from 'immutable';
import startingData from '../sample';
import _ from 'lodash';

import { stitchTogetherContests } from '../munger';

const allData = fromJS(startingData.ElectionReport);
const contests = allData.getIn(['Election', 'ContestCollection', 'Contest']);
const parties = allData.getIn(['PartyCollection', 'Party']);
const candidates = allData.getIn(['Election', 'CandidateCollection', 'Candidate']);

describe('stitchTogetherContests', () => {
  let stitched;

  beforeEach(() => {
    stitched = stitchTogetherContests(contests, parties, candidates);
  });

  it('handles candidate contests correctly', () => {
    const contest = stitched.find(c => c.get('type') === 'CandidateContest');
    expect(contest.get('name')).to.exist;
    expect(contest.get('id')).to.exist;
    expect(contest.getIn(['options', 0, 'name'])).to.exist;
    expect(contest.getIn(['options', 0, 'partyName'])).to.exist;
    expect(contest.getIn(['options', 0, 'partyID'])).to.exist;
    expect(contest.getIn(['options', 0, 'id'])).to.exist;
  });

  // it('handles ballot measure contests correctly', () => {

  // });

  // it('handles party contests correctly', () => {

  // });

  // it('handles all incoming data', () => {
  //   expect(contests.size).not.to.eq(0);
  //   expect(parties.size).not.to.eq(0);
  //   expect(candidates.size).not.to.eq(0);

  //   expect(
  //     stitched.filter(r => r.get('name') && r.get('type') && r.get('id')).size
  //   ).to.eq(contests.size);
  //   // result.forEach(contest => {
  //   //   expect(
  //   //     ['PartyContest', 'CandidateContest', 'BallotMeasureContest']
  //   //       .includes(contest.get('type'))
  //   //   ).to.eq(true);

  //   //   expect(contest.get('voteLimit')).to.exist;

  //   //   contest.get('options').forEach(option => {
  //   //     expect(option.get('id')).to.exist;
  //   //     expect(option.get('name')).to.exist;
  //   //   });
  //   // });

  //   // const candidateContests = result.filter(c => c.get('type') === 'CandidateContest');
  //   // const candidateParties = candidateContests.map(c => c.get('partyName'));
  //   // expect(_.uniq(candidateParties).sort()).to.eq(['Democratic', 'Green', 'Libertarian', 'Republican']);
  // });
});
