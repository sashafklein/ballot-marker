import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';

import { changeSetting } from '../../store/actions';
import PageWithActions from '../../shared/components/PageWithActions';
import Button from '../../shared/components/Button';
import gbs from '../../shared/styles';
import { transformFontSizes } from '../../shared/utils/styles';

// Export an unconnected version for testing
export const Headset = ({ dispatch, screenOff, textSize }) => {
  const text = transformFontSizes(gbs.t, textSize);

  return (
    <PageWithActions onNext={ Actions.language } onBack={ Actions.pop }>
      <View style={ [gbs.l.centeredContainer] }>
        <Text style={ gbs.w.mb20 }>
          <Text style={ [text.p, text.bold] }>If you want to hear the ballot out loud, </Text>
          <Text style={ [text.p] }>plug in a headset.</Text>
        </Text>
        <Text style={ [text.p] }>
          For privacy while using the audio ballot, turn the screen off.
        </Text>
        <Button
          onPress={ () => dispatch(changeSetting('screenOff', !screenOff)) }
          addStyles={ {
            button: [gbs.l.button, {
              width: gbs.s.percWidth70
            }]
          } }
        >
          { `Turn the screen ${screenOff ? 'on' : 'off'}` }
        </Button>
        <Text style={ [text.p] }>If you use a special keyboard, attach it now.</Text>
      </View>
    </PageWithActions>
  );
};

const { func, bool, string } = React.PropTypes;
Headset.propTypes = {
  dispatch: func,
  screenOff: bool,
  textSize: string
};

const mapStateToProps = state => ({
  screenOff: state.settings.get('screenOff'),
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(Headset);
