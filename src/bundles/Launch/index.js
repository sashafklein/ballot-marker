import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { wrap } from '../../shared/wrap';
import PageWithActions from '../../shared/components/PageWithActions';
import { isDateElement } from '../../shared/utils/date';
import { getTitle } from '../../shared/utils/election';

export const Launch = ({ type, fullTitle, gbs }) => {
  // Date of election doesn't seem to be provided in data?
  const date = fullTitle.split(' ').filter(el => isDateElement(el)).join(' ');

  return (
    <PageWithActions onNext={ Actions.headset } next="Start" back={ null }>
      <View style={ [gbs.l.centeredContainer] }>
        <Text style={ [gbs.t.h1, gbs.l.h1, gbs.w.mb10, { color: gbs.c.text } ]}>
          Official Ballot
        </Text>
        <Text style={ [gbs.t.h1, gbs.l.h1, { color: gbs.c.text } ]}>
          { getTitle(type) }
        </Text>
        <Text style={ [gbs.t.h1, gbs.l.h1, { color: gbs.c.text } ]}>
          { date }
        </Text>
      </View>
    </PageWithActions>
  );
};

const { string, object } = React.PropTypes;
Launch.propTypes = {
  type: string.isRequired,
  fullTitle: string.isRequired,
  gbs: object
};

const mapStateToProps = state => ({
  type: state.metaData.get('type'),
  fullTitle: state.metaData.get('fullTitle')
});

export default wrap(mapStateToProps)(Launch);
