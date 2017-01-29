import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import TextSizeButton from './TextSizeButton';
import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Settings = ({ gbs }) => {
  return (
    <PageWithActions onBack={ Actions.pop } onNext={ Actions.instructions }>
      <ScrollView>
        <View style={ gbs.l.centeredContainer }>
          <Text style={ [gbs.t.p, gbs.l.p]}>Choose text size and color:</Text>
          {
            ['small', 'medium', 'large'].map((size, i) => (
              <TextSizeButton size={ size } key={ i } />
            ))
          }
        </View>
        <View>
          <Text style={ [gbs.t.p, gbs.t.bold] }>Placeholder</Text>
          <Text style={ gbs.t.p }>Color schemes will go here once designed</Text>
        </View>
      </ScrollView>
    </PageWithActions>
  );
};

const { object } = React.PropTypes;
Settings.propTypes = {
  gbs: object
};

export default wrap()(Settings);

