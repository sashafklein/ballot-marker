import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import LanguageList from './LanguageList';

import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Language = ({ gbs }) => {
  return (
    <PageWithActions onBack={ Actions.pop } onNext={ Actions.settings }>
      <View style={ [gbs.l.centeredContainer, gbs.w.mh0] }>
        <Text style={ gbs.t.p }>Set your language:</Text>
        <View style={ gbs.w.mt50 } >
          <LanguageList />
        </View>
      </View>
    </PageWithActions>
  );
};

const { object } = React.PropTypes;
Language.propTypes = {
  gbs: object
};

export default wrap()(Language);

