import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';

import { changeSetting } from '../../store/actions';
import PageWithActions from '../../shared/components/PageWithActions';
import Button from '../../shared/components/Button';

import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Headset = ({ dispatch, screenOff, gbs }) => {
  return (
    <PageWithActions onNext={ Actions.language } onBack={ Actions.pop }>
      <View style={ [gbs.l.centeredContainer, { marginTop: -(gbs.s.percHeight10) }] }>
        <Text style={ gbs.w.mb20 }>
          <Text style={ [gbs.t.p, gbs.t.bold] }>If you want to hear the ballot out loud, </Text>
          <Text style={ [gbs.t.p] }>plug in a headset.</Text>
        </Text>
        <Text style={ [gbs.t.p] }>
          For privacy while using the audio ballot, turn the screen off.
        </Text>
        <View
          style={ [{ height: gbs.s.percHeight10, backgroundColor: gbs.c.buttonBg }, gbs.w.mv20] }
        >
          <Button
            onPress={ () => dispatch(changeSetting('screenOff', !screenOff)) }
            addStyles={ {
              text: [gbs.l.buttonText]
            } }
          >
            { `Turn the screen ${screenOff ? 'on' : 'off'}` }
          </Button>
        </View>
        <Text style={ [gbs.t.p] }>If you use a special keyboard, attach it now.</Text>
      </View>
    </PageWithActions>
  );
};

const { func, bool, object } = React.PropTypes;
Headset.propTypes = {
  dispatch: func,
  screenOff: bool,
  gbs: object
};

const mapStateToProps = state => ({
  screenOff: state.settings.get('screenOff')
});

export default wrap(mapStateToProps)(Headset);
