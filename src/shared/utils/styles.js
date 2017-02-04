import _ from 'lodash';

// Takes an array of style objects (or nth-dimension array of objects) and progressively merges
const stitchStyles = arrayOfStyles => {
  return _.flattenDeep(_.compact(arrayOfStyles)).reduce((result, obj) => {
    return Object.assign(result, obj || {});
  }, {});
};

// Given default styles and styles to add or overwrite, returns a function that takes a
// styles key and returns appropriately combined/overwritten styles.
export const styleCombiner = (base = {}, add = {}, replace = {}) => {
  return key => (replace[key] ?
    stitchStyles([replace[key]]) :
    stitchStyles([base[key], add[key]]));
};

// Takes the (redux-stored) textSize argument and applies it to global text sizes
export const transformFontSizes = (textStyles, size = 'small') => {
  const multiple = {
    small: 1, medium: 1.2, large: 1.4
  }[size];

  const newStyles = {};

  Object.keys(textStyles).forEach(styleRule => {
    const style = textStyles[styleRule];
    newStyles[styleRule] = {};

    Object.keys(style).forEach(ruleKey => {
      if (ruleKey === 'fontSize') {
        newStyles[styleRule][ruleKey] = style[ruleKey] * multiple;
      } else {
        newStyles[styleRule][ruleKey] = style[ruleKey];
      }
    });
  });

  return newStyles;
};

// Takes the (redux-stored) colorScheme argument and applies it to global colors
export const transformColors = (colors, scheme = 'full') => {
  const schemeOptions = ['full', 'blackWhite', 'highContrast', 'lowContrast'];
  if (!schemeOptions.includes(scheme)) {
    throw new Error(`Given scheme must be among scheme options: ${schemeOptions}`);
  }

  return colors; // for now - will ideally implement color scheme with a designer
};
