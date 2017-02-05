export const changeSetting = (setting, value) => ({
  type: 'CHANGE_SETTING', setting, value
});

export const setVote = (contestIndex, selections) => ({
  type: 'SET_VOTE', contestIndex, selections
});
