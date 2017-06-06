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
    fontFamily: 'Avenir',
    fontSize: scaleText(20)
  },

  h2: {
    fontFamily: 'Avenir',
    fontSize: scaleText(28)
  },

  h3: {
    fontFamily: 'Avenir',
    fontSize: scaleText(16)
  },

  h4: {
    fontFamily: 'Avenir',
    fontSize: scaleText(14)
  },

  p: {
    fontFamily: 'Avenir',
    fontSize: scaleText(12)
  },

  small: {
    fontFamily: 'Avenir',
    fontSize: scaleText(7)
  },

  // Weight
  bold: {
    fontFamily: 'Avenir-Heavy'
  },

  wrap: {
    flexWrap: 'wrap'
  }
};
