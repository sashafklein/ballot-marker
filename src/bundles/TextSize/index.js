import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import TextSizeButton from './TextSizeButton';
import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const TextSize = ({ gbs }) => {
  return (
    <PageWithActions onBack={ Actions.pop } onNext={ Actions.instructions }>
      <View style={ gbs.l.centeredContainer }>
        <Text style={ [gbs.t.p, gbs.l.p]}>Choose text size and color:</Text>
        {
          ['small', 'medium', 'large'].map((size, i) => (
            <TextSizeButton size={ size } key={ i } />
          ))
        }
      </View>
    </PageWithActions>
  );
};

const { object } = React.PropTypes;
TextSize.propTypes = {
  gbs: object
};

export default wrap()(TextSize);

