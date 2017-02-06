import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../../shared/components/Button';

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
    <View style={ { flex: 1, height: gbs.s.percHeigh100 } }>
      <View style={ gbs.l.centeredContainer }>
        {
          messages.map((msg, ind) => (
            typeof msg === 'string'
              ? message(msg, ind)
              : msg
          ))
        }
        <Button
          onPress={ () => {
            Actions.pop();
          } }
          addStyles={ {
            button: [gbs.l.button, { backgroundColor: gbs.c.green }]
          } }
        >
          Close
        </Button>
      </View>
    </View>
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
