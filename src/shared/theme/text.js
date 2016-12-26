
// Takes a iPhone-5 friendly value, and resizes it
// for the current screen
const scaleText = (value) => value;

export default {
  h1: {
    fontSize: scaleText(33)
  },

  h2: {
    fontSize: scaleText(18)
  },

  p: {
    fontSize: scaleText(15)
  },

  // Size
  small: {
    fontSize: scaleText(11)
  },
};
