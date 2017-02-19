import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';

import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Oops = ({ messages, gbs }) => {
  const message = (content, ind) => <Text
    key={ ind }
    style={ [ gbs.t.p, gbs.l.p ] }
  >
    { content }
  </Text>;

  return (
    <PageWithActions back="Close" next={ null } onBack={ Actions.pop }>
      <View style={ gbs.l.centeredContainer }>
        {
          messages.map((msg, ind) => (
            typeof msg === 'string'
              ? message(msg, ind)
              : msg
          ))
        }
      </View>
    </PageWithActions>
  );
};

const { string, oneOfType, arrayOf, element, object } = React.PropTypes;
Oops.propTypes = {
  messages: arrayOf(oneOfType([string, element])),
  gbs: object
};

Oops.defaultProps = {
  messages: ['Something went wrong!']
};

const mapStateToProps = state => ({
  messages: state.errorMessage
});

export default wrap(mapStateToProps)(Oops);
