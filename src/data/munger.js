/* eslint no-console:0, max-len:0 */

import { Map, fromJS } from 'immutable';

const incorporateExtra = (originalObject, extrasObject, immutableObject) => fromJS(
  Object.assign(
    {},
    originalObject,
    Object.keys(extrasObject)
      .reduce((obj, key) => Object.assign(
        {},
        obj,
        { [key]: immutableObject.getIn(extrasObject[key]) }
      ), {})
  )
);

const optionFromSelection = (selection, list, selectionNamePath, objectPath, optionExtra) => {
  if (!selection.getIn) {
    return null; // TODO figure out how to handle bad data like candidate-62 contest
  }

  const object = list.find(p => p.get('_objectId') === selection.getIn(objectPath));
  if (object) {
    const objectJSON = incorporateExtra(
      {
        name: object.getIn(selectionNamePath),
        abbreviation: object.get('Abbreviation'),
        id: object.get('_objectId')
      },
      optionExtra,
      object
    );
    return objectJSON;
  } else {
    console.log('No associated object found for', selection.toJS());
    return null;
  }
};

const createStitchedList = (contest, list, selectionNamePath, contestExtra, optionExtra = {}) => {
  let selections = contest.get('BallotSelection');
  const type = contest.get('_xsi:type');
  if (!selections) {
    return null; // TODO - Handle weird data like 'PRECINCT 3, DIRECTOR, BARTON SPRINGS EDWARDS AQUIFER CONSERVATION DISTRICT'
  } else if (selections instanceof Map) {
    // Some selections data is a single object, instead of an array of them
    selections = fromJS([selections]);
  }

  return incorporateExtra(
    {
      options: selections.map(selection => optionFromSelection(
        selection,
        list,
        selectionNamePath,
        type === 'PartyContest' ? ['PartyId'] : ['CandidateId', 0],
        optionExtra
      )).filter(option => option),
      type,
      name: contest.get('Name'),
      voteLimit: parseInt(contest.get('NumberElected') || 1)
    },
    contestExtra || {},
    contest
  );
};

const createPartyContestList = (contest, parties) => createStitchedList(
  contest,
  parties,
  ['Name', 'Text', '__text'],
  { electoralDistrictID: ['ElectoralDistrictId'] }
);

const createCandidateContestList = (contest, candidates) => createStitchedList(
  contest,
  candidates,
  ['BallotName', 'Text', '__text'],
  {},
  { partyId: ['PartyId'] }
);

const createBallotMeatureContestList = contest => fromJS({
  name: contest.get('Name'),
  electoralDistrictID: contest.get('ElectoralDistrictId'),
  text: contest.getIn(['FullText', 'Text', '__text']),
  id: contest.get('_objectId'),
  type: 'BallotMeasureContest',
  voteLimit: parseInt(contest.get('NumberElected') || 1),
  options: contest.get('BallotSelection').map(option => fromJS({
    name: option.getIn(['Selection', 'Text', '__text']),
    id: option.get('_objectId')
  }))
});

export const stitchTogetherContests = (contests, parties, candidates) => {
  return contests.map(contest => {
    const type = contest.get('_xsi:type');
    if (type === 'PartyContest') {
      return createPartyContestList(contest, parties);
    } else if (type === 'CandidateContest') {
      return createCandidateContestList(contest, candidates);
    } else if (type === 'BallotMeasureContest') {
      return createBallotMeatureContestList(contest);
    } else {
      console.error(`Unexpected contest type: ${type}`);
      return null; // fail quietly
    }
  }).filter(contest => contest);
};
