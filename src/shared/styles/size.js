import _ from 'lodash';
import { Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('window');

const size = {};

_.range(0, 21).forEach(base => {
  ['Height', 'Width'].forEach(dimension => {
    const amount = base * 5;
    const key = `perc${dimension}${amount}`;
    size[key] = screenDimensions[dimension.toLowerCase()] * (amount / 100.0);
  });
});

export default size;
