
// Takes a iPhone-5 friendly value, and resizes it
// for the current screen
const scaleText = (value) => value;

export default {
  // Size
  h1: {
    fontSize: scaleText(33)
  },

  h2: {
    fontSize: scaleText(28)
  },

  h3: {
    fontSize: scaleText(24)
  },

  p: {
    fontSize: scaleText(22)
  },

  small: {
    fontSize: scaleText(18)
  },

  // Weight
  bold: {
    fontWeight: 'bold'
  },
};
