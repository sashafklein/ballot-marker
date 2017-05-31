import _ from 'lodash';
import { Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('window');

const size = {};

_.range(0, 41).forEach(base => {
  ['Height', 'Width'].forEach(dimension => {
    const amount = base * 2.5;
    const stringAmount = amount.toString().replace('.', '_');
    const key = `perc${dimension}${stringAmount}`;
    size[key] = screenDimensions[dimension.toLowerCase()] * (amount / 100.0);
  });
});

export default size;
