import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Voter = ({ gbs }) => {
  return (
    <PageWithActions onBack={ Actions.pop }>
      <View style={ gbs.l.centeredContainer }>
      </View>
    </PageWithActions>
  );
};

const { object } = React.PropTypes;
Voter.propTypes = {
  gbs: object
};

const mapStateToProps = state => ({});

export default wrap(mapStateToProps)(Voter);

