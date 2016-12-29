import React from 'react';
import { Text, View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import gbs from '../../shared/styles';
import PageWithActions from '../../shared/components/PageWithActions';
import { isDateElement } from '../../shared/utils/date';
import { getTitle } from './helpers';

export const Launch = ({ type, fullTitle }) => {
  // Date of election doesn't seem to be provided in data?
  const date = fullTitle.split(' ').filter(el => isDateElement(el)).join(' ');

  return (
    <PageWithActions onNext={ Actions.headset } next="Start" back={ null }>
      <View style={ [gbs.l.centeredContainer] }>
        <Text style={ [gbs.t.h1, gbs.l.h1, gbs.w.mb10, { color: gbs.c.black } ]}>
          Official Ballot
        </Text>
        <Text style={ [gbs.t.h1, gbs.l.h1, { color: gbs.c.black } ]}>
          { getTitle(type) }
        </Text>
        <Text style={ [gbs.t.h1, gbs.l.h1, { color: gbs.c.black } ]}>
          { date }
        </Text>
      </View>
    </PageWithActions>
  );
};

const { string } = React.PropTypes;
Launch.propTypes = {
  type: string.isRequired,
  fullTitle: string.isRequired,
};

const mapStateToProps = state => ({
  type: state.data.getIn(['Election', 'Type']),
  fullTitle: state.data.getIn(['Election', 'Name', 'Text', '__text']),
});

export default compose(
  connect(mapStateToProps)
)(Launch);