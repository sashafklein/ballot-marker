import React from 'react';
import { Text, View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import gbs from '@styles';
import PageWithActions from '@components/PageWithActions';
import { isDateElement } from '@utils/date';
import { getTitle } from './helpers';

export const Instructions = ({ type, fullTitle }) => {
  // Date of election doesn't seem to be provided in data?
  const date = fullTitle.split(' ').filter((el) => isDateElement(el)).join(' ');

  return (
    <PageWithActions onNext={ () => console.log('next') } back="Back" onBack={ () => {} }>
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
Instructions.propTypes = {
  type: string.isRequired,
  fullTitle: string.isRequired,
};

const mapStateToProps = (state) => ({
  type: state.data.getIn(['Election', 'Type']),
  fullTitle: state.data.getIn(['Election', 'Name', 'Text', '__text']),
});

export default compose(
  connect(mapStateToProps)
)(Instructions);
