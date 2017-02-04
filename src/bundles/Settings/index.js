import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import PageWithActions from '../../shared/components/PageWithActions';
import Button from '../../shared/components/Button';
import TextSizeButton from './TextSizeButton';
import { changeSetting } from '../../store/actions';
import { wrap } from '../../shared/wrap';

const colorSchemes = ['Full', 'High Contrast', 'Low Contrast', 'Black White'];

// Export an unconnected version for testing
export const Settings = ({ gbs, fromVote, dispatch }) => {
  return (
    <PageWithActions
      onBack={ Actions.pop }
      onNext={ Actions.instructions }
      next={ fromVote ? null : 'Next' }
    >
      <ScrollView>
        <View style={ gbs.l.centeredContainer }>
          <Text style={ [gbs.t.p, gbs.l.p]}>Choose text size:</Text>
          {
            ['small', 'medium', 'large'].map((size, i) => (
              <TextSizeButton size={ size } key={ i } />
            ))
          }
        </View>
        <View>
          <Text style={ [gbs.t.p, gbs.t.bold, gbs.l.p] }>
            Choose color scheme (functionality pending):
          </Text>
          {
            colorSchemes.map((scheme, index) => (
              <Button
                key={ index }
                addStyles={ {
                  button: gbs.l.button,
                  text: gbs.t.p
                } }
                onPress={ () => { dispatch(changeSetting('colorScheme', _.camelCase(scheme))); } }
              >
                { scheme }
              </Button>
            ))
          }
        </View>
      </ScrollView>
    </PageWithActions>
  );
};

const { object, bool, func } = React.PropTypes;
Settings.propTypes = {
  gbs: object,
  fromVote: bool,
  dispatch: func
};

export default wrap()(Settings);

