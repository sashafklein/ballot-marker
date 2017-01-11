export const changeSetting = (setting, value) => ({
  type: 'CHANGE_SETTING', setting, value
});

export const setErrorMessage = message => ({
  type: 'SET_ERROR_MESSAGE', message
});
