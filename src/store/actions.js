export const changeSetting = (setting, value) => ({
  type: 'CHANGE_SETTING', setting, value
});

export const setVote = (contestID, selections) => ({
  type: 'SET_VOTE', contestID, selections
});

export const setVotes = votes => ({
  type: 'SET_VOTES', votes
});
