import _ from 'lodash';

// Defines margin/padding "classes" for each direction, going up in units of 5 from 0 to 100
const whitespace = {};
['margin', 'padding'].forEach(type => {
  ['vertical', 'horizontal', 'left', 'right', 'top', 'bottom', ''].forEach(direction => {
    _.range(0, 20).forEach(base => {
      const amount = base * 5;
      const key = `${type.slice(0, 1)}${direction.slice(0, 1)}${amount}`;
      const object = {
        [`${type}${direction.slice(0, 1).toUpperCase()}${direction.slice(1)}`]: amount
      };
      whitespace[key] = object;
    });
  });
});

export default whitespace;
