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
    fontSize: scaleText(25)
  },

  h2: {
    fontSize: scaleText(22)
  },

  h3: {
    fontSize: scaleText(20)
  },

  h4: {
    fontSize: scaleText(18)
  },

  p: {
    fontSize: scaleText(16)
  },

  small: {
    fontSize: scaleText(14)
  },

  // Weight
  bold: {
    fontWeight: 'bold'
  },

  wrap: {
    flexWrap: 'wrap'
  }
};
