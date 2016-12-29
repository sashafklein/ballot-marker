import React from 'react';
import { View, Text } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import gbs from '../../shared/styles';
import LanguageList from './LanguageList';

// Export an unconnected version for testing
export const Language = () => (
  <PageWithActions onBack={ Actions.pop } onNext={ Actions.textSize }>
    <View style={ [gbs.l.centeredContainer, gbs.w.mh0] }>
      <Text style={ gbs.t.p }>Set your language:</Text>
      <View style={ gbs.w.mt50 } >
        <LanguageList />
      </View>
    </View>
  </PageWithActions>
);

const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps))(Language);

