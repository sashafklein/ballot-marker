import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { list } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';

import { isDateElement } from '../../shared/utils/date';
import { getTitle } from '../../shared/utils/election';

// Export an unconnected version for testing
export const ElectionDetails = ({ gbs, type, date, area, city, contests }) => {
  return (
    <PageWithActions
      onBack={ Actions.pop }
      onNext={ () => { Actions.voter({ contestIndex: 0 }); } }
      next="Begin Voting"
    >
      <View style={ gbs.l.centeredContainer }>
        <ScrollView>
          <View style={ gbs.w.mv10 }>
            <Text style={ [gbs.t.h3] }>{ [city, area].join(', ') }</Text>
          </View>
          <View style={ gbs.w.mv10 }>
            <Text style={ [gbs.t.p] }>This ballot is for</Text>
          </View>

          <View>
            <Text style={ [gbs.t.p, gbs.t.bold] }>{ getTitle(type) }</Text>
          </View>
          <View>
            <Text style={ [gbs.t.p, gbs.t.bold] }>{ date }</Text>
          </View>
          <View>
            <Text style={ [gbs.t.p, gbs.t.bold] }>{ city }</Text>
          </View>
          <View>
            <Text style={ [gbs.t.p, gbs.t.bold] }>{ [city, area].join(', ') }</Text>
          </View>

          {
            contests.map((contest, index) => (
              <View key={ index }>
                <Text key={ index } style={ [gbs.t.p, gbs.t.bold] }>{ contest.get('Name') }</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </PageWithActions>
  );
};

const { string, object } = React.PropTypes;
ElectionDetails.propTypes = {
  gbs: object,
  type: string,
  date: string,
  city: string,
  area: string,
  contests: list
};

const mapStateToProps = state => ({
  type: state.data.getIn(['Election', 'Type']),
  date: state.data.getIn(['Election', 'Name', 'Text', '__text']).split(' ').filter(el => isDateElement(el)).join(' '),
  city: state.data.getIn(['Issuer']),
  area: state.data.getIn(['IssuerAbbreviation']),
  contests: state.data.getIn(['Election', 'ContestCollection', 'Contest'])
});

export default wrap(mapStateToProps)(ElectionDetails);

