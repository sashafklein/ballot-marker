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
