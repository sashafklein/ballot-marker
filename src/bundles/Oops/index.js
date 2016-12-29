import React from 'react';
import { View, Text } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from '../../shared/components/Button';
import gbs from '../../shared/styles';
import { setErrorMessage } from '../../store/actions';
import { transformFontSizes } from '../../shared/utils/styles';

const message = (msg, ind, text) => <Text key={ ind } style={ [ text.p, gbs.l.p ] }>{ msg }</Text>;

// Export an unconnected version for testing
export const Oops = ({ messages, dispatch, textSize }) => {
  const text = transformFontSizes(gbs.t, textSize);

  return (
    <View style={ { flex: 1, height: gbs.s.percHeigh100 } }>
      <View style={ gbs.l.centeredContainer }>
        {
          messages instanceof Array ?
          messages.map((msg, ind) => message(msg, ind, text)) :
          message(messages, 0, text)
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
};

const { func, string, oneOfType, array } = React.PropTypes;
Oops.propTypes = {
  dispatch: func,
  messages: oneOfType([string, array]),
  textSize: string
};

const mapStateToProps = state => ({
  messages: state.errorMessage,
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(Oops);
