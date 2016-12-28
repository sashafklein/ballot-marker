export const decrement = () => ({
  type: 'DECREMENT',
});

export const increment = () => ({
  type: 'INCREMENT',
});

export const changeSetting = (setting, value) => ({
  type: 'CHANGE_SETTING', setting, value
});
