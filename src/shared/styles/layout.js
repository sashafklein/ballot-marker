import size from './size';

const capitalize = string => string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

const buttonHeight = size.percHeight10;
export default {
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: size.percWidth5
  },
  button: {
    marginVertical: 20
  },
  buttonHeight,
  navButtonOffset: 5,
  buttonText: {
    paddingHorizontal: 20
  },
  scrollWithButtons: {
    paddingTop: buttonHeight + size.percHeight7_5
  },
  p: {
    marginVertical: 10
  },
  hFlex: {
    flexDirection: 'row',
    flex: 1
  },
  vFlex: {
    flexDirection: 'column',
    flex: 1
  },
  h1: {
    marginBottom: 15
  },
  border: (borderWidth, color, direction = '') => ({
    [`border${capitalize(direction)}Color`]: color,
    [`border${capitalize(direction)}Width`]: borderWidth
  })
};
