/* eslint no-console:0, max-len:0 */

import { Map, fromJS } from 'immutable';

const partyNamePath = ['Name', 'Text', '__text'];
const candidateNamePath = ['BallotName', 'Text', '__text'];

const formatName = name => name.split(' ')
  .map(s => [s.slice(0, 1), s.slice(1, s.length).toLowerCase()].join(''))
  .join(' ');

const optionFromSelection = (selection, list, selectionNamePath, objectPath, optionExtra, index) => {
  if (!selection.getIn) {
    return null; // TODO figure out how to handle bad data like candidate-62 contest
  }

  const object = list.find(p => p.get('_objectId') === selection.getIn(objectPath));
  if (object) {
    const objectJSON = fromJS(Object.assign({},
      {
        name: object.getIn(selectionNamePath),
        abbreviation: object.get('Abbreviation'),
        id: object.get('_objectId'),
        index
      },
      optionExtra || {}
    ));
    return objectJSON;
  } else {
    console.log(
      'No associated object found for',
      selection.toJS(),
      'Searching in',
      objectPath
    );
    return null;
  }
};

// TODO - Handle weird data like 'PRECINCT 3, DIRECTOR, BARTON SPRINGS EDWARDS AQUIFER CONSERVATION DISTRICT'
const getSelections = contest => {
  let selections = contest.get('BallotSelection');
  if (selections instanceof Map) {
    // Some selections data is a single object, instead of an array of them
    selections = fromJS([selections]);
  }
  return selections || fromJS([]);
};

const createPartyContestList = (contest, parties, index) => {
  return fromJS({
    options: getSelections(contest).map((selection, selectionIndex) => optionFromSelection(
      selection,
      parties,
      partyNamePath,
      ['PartyId'],
      {},
      selectionIndex
    )).filter(option => option),
    type: contest.get('_xsi:type'),
    name: formatName(contest.get('Name')),
    id: contest.get('_objectId'),
    voteLimit: parseInt(contest.get('NumberElected') || 1),
    electoralDistrictID: contest.get('ElectoralDistrictId'),
    index
  });
};


const createCandidateContestList = (contest, candidates, parties, index) => {
  const optionExtra = selection => {
    const candidate = candidates.find(c => c.get('_objectId') === selection.getIn(['CandidateId', 0]));
    const party = parties.find(p => p.get('_objectId') === candidate.get('PartyId'));

    return {
      partyID: candidate.get('PartyId'),
      partyName: (party && party.getIn(partyNamePath)) || 'No Party'
    };
  };

  return fromJS({
    options: getSelections(contest).map((selection, selectionIndex) => optionFromSelection(
      selection,
      candidates,
      candidateNamePath,
      ['CandidateId', 0],
      optionExtra(selection),
      selectionIndex
    )).filter(option => option),
    id: contest.get('_objectId'),
    type: contest.get('_xsi:type'),
    name: formatName(contest.get('Name')),
    voteLimit: parseInt(contest.get('NumberElected') || 1),
    index
  });
};

const createBallotMeatureContestList = (contest, index) => fromJS({
  name: formatName(contest.get('Name')),
  electoralDistrictID: contest.get('ElectoralDistrictId'),
  text: contest.getIn(['FullText', 'Text', '__text']),
  id: contest.get('_objectId'),
  type: 'BallotMeasureContest',
  voteLimit: parseInt(contest.get('NumberElected') || 1),
  options: getSelections(contest).map((option, optionIndex) => fromJS({
    name: option.getIn(['Selection', 'Text', '__text']),
    id: option.get('_objectId'),
    index: optionIndex
  })),
  index
});

export const stitchTogetherContests = (contests, parties, candidates) => {
  return contests.map((contest, index) => {
    const type = contest.get('_xsi:type');
    if (type === 'PartyContest') {
      return createPartyContestList(contest, parties, index);
    } else if (type === 'CandidateContest') {
      return createCandidateContestList(contest, candidates, parties, index);
    } else if (type === 'BallotMeasureContest') {
      return createBallotMeatureContestList(contest, index);
    } else {
      console.error(`$Contest #${index} - unexpected type: ${type}`);
      return null; // fail quietly
    }
  }).filter(contest => contest);
};
