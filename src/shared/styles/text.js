import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Takes a iPhone-5 friendly value, and resizes it
// for the current screen
const scaleText = base => {
  if (width >= 414) { // iPhone 6 plus
    return base * 1.4;
  } else if (width >= 375) { // iPhone 6
    return base * 1.2;
  }
  return base;
};

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
