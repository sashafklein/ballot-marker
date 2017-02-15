/* eslint no-console:0, max-len:0 */

import { Map, fromJS } from 'immutable';

const partyNamePath = ['Name', 'Text', '__text'];
const candidateNamePath = ['BallotName', 'Text', '__text'];

// const incorporateExtra = (originalObject, extrasObject, immutableObject) => fromJS(
//   Object.assign(
//     {},
//     originalObject,
//     Object.keys(extrasObject)
//       .reduce((obj, key) => Object.assign(
//         {},
//         obj,
//         { [key]: immutableObject.getIn(extrasObject[key]) }
//       ), {})
//   )
// );

const log = (thing) => {  return thing; };

const optionFromSelection = (selection, list, selectionNamePath, objectPath, optionExtra) => {
  if (!selection.getIn) {
    return null; // TODO figure out how to handle bad data like candidate-62 contest
  }

  const object = list.find(p => p.get('_objectId') === selection.getIn(objectPath));
  if (object) {
    const objectJSON = fromJS(Object.assign({},
      {
        name: object.getIn(selectionNamePath),
        abbreviation: object.get('Abbreviation'),
        id: object.get('_objectId')
      },
      optionExtra || {}
    ));
    return objectJSON;
  } else {
    console.log('No associated object found for', selection.toJS());
    return null;
  }
};

// const createStitchedList = (contest, list, selectionNamePath, contestExtra, optionExtra = {}) => {
//   let selections = contest.get('BallotSelection');
//   const type = contest.get('_xsi:type');
//   if (!selections) {
//     return null; // TODO - Handle weird data like 'PRECINCT 3, DIRECTOR, BARTON SPRINGS EDWARDS AQUIFER CONSERVATION DISTRICT'
//   } else if (selections instanceof Map) {
//     // Some selections data is a single object, instead of an array of them
//     selections = fromJS([selections]);
//   }

//   return fromJS(Object.assign({},
//     {
//       options: selections.map(selection => optionFromSelection(
//         selection,
//         list,
//         selectionNamePath,
//         type === 'PartyContest' ? ['PartyId'] : ['CandidateId', 0]
//       )).filter(option => option),
//       type,
//       name: contest.get('Name'),
//       voteLimit: parseInt(contest.get('NumberElected') || 1)
//     },
//     contestExtra
//   ));
// };

// TODO - Handle weird data like 'PRECINCT 3, DIRECTOR, BARTON SPRINGS EDWARDS AQUIFER CONSERVATION DISTRICT'
const getSelections = contest => {
  let selections = contest.get('BallotSelection');
  if (selections instanceof Map) {
    // Some selections data is a single object, instead of an array of them
    selections = fromJS([selections]);
  }
  return selections || fromJS([]);
};

const createPartyContestList = (contest, parties) => {
  return log(fromJS({
    options: getSelections(contest).map(selection => optionFromSelection(
      selection,
      parties,
      partyNamePath,
      ['CandidateId', 0],
      {}
    )).filter(option => option),
    type: contest.get('_xsi:type'),
    name: contest.get('Name'),
    voteLimit: parseInt(contest.get('NumberElected') || 1),
    electoralDistrictID: contest.get('ElectoralDistrictId')
  }));
};


const createCandidateContestList = (contest, candidates, parties) => {
  const optionExtra = selection => {
    const candidate = candidates.find(c => c.get('_objectId') === selection.getIn(['CandidateId', 0]));
    const party = parties.find(p => p.get('_objectId') === candidate.get('PartyId'));

    return {
      partyID: candidate.get('PartyId'),
      partyName: party && party.getIn(partyNamePath)
    };
  };

  return log(fromJS({
    options: getSelections(contest).map(selection => optionFromSelection(
      selection,
      candidates,
      candidateNamePath,
      ['CandidateId', 0],
      optionExtra(selection)
    )).filter(option => option),
    id: contest.get('_objectId'),
    type: contest.get('_xsi:type'),
    name: contest.get('Name'),
    voteLimit: parseInt(contest.get('NumberElected') || 1)
  }));
};

const createBallotMeatureContestList = contest => fromJS({
  name: contest.get('Name'),
  electoralDistrictID: contest.get('ElectoralDistrictId'),
  text: contest.getIn(['FullText', 'Text', '__text']),
  id: contest.get('_objectId'),
  type: 'BallotMeasureContest',
  voteLimit: parseInt(contest.get('NumberElected') || 1),
  options: getSelections(contest).map(option => fromJS({
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
      return createCandidateContestList(contest, candidates, parties);
    } else if (type === 'BallotMeasureContest') {
      return createBallotMeatureContestList(contest);
    } else {
      console.error(`Unexpected contest type: ${type}`);
      return null; // fail quietly
    }
  }).filter(contest => contest);
};
