import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../../shared/components/Button';
import { setErrorMessage } from '../../store/actions';

import { wrap } from '../../shared/wrap';

const message = (msg, ind, gbs) => <Text key={ ind } style={ [ gbs.t.p, gbs.l.p ] }>{ msg }</Text>;

// Export an unconnected version for testing
export const Oops = ({ messages, dispatch, gbs }) => (
  <View style={ { flex: 1, height: gbs.s.percHeigh100 } }>
    <View style={ gbs.l.centeredContainer }>
      {
        messages instanceof Array ?
        messages.map((msg, ind) => message(msg, ind, gbs)) :
        message(messages, 0, gbs)
      }
      <Button
        onPress={ () => {
          dispatch(setErrorMessage(null));
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

const { func, string, oneOfType, array, object } = React.PropTypes;
Oops.propTypes = {
  dispatch: func,
  messages: oneOfType([string, array]),
  gbs: object
};

const mapStateToProps = state => ({
  messages: state.errorMessage
});

export default wrap(mapStateToProps)(Oops);
