import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import TextManifest from '../../shared/components/TextManifest';
import { wrap } from '../../shared/wrap';

import { isDateElement } from '../../shared/utils/date';
import { getTitle } from '../../shared/utils/election';

// Export an unconnected version for testing
export const ElectionDetails = ({ gbs, type, date, area, city }) => {
  return (
    <PageWithActions
      onBack={ Actions.pop }
      onNext={ () => { Actions.voter({ contestIndex: 0 }); } }
      next="Begin Voting"
    >
      <ScrollView style={ [gbs.l.scrollWithButtons] }>
        <TextManifest
          styles={ { alignItems: 'center' } }
          textArray={ [
            [{ h1: [city, area].join(', ') }],
            [{ p: 'This ballot is for:' }],
            [{ b: getTitle(type) }],
            [{ b: date }],
            [{ b: city }],
            [{ b: [city, area].join(', ') }]
          ]}
        />
      </ScrollView>
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
};

const mapStateToProps = state => ({
  type: state.metaData.get('type'),
  date: state.metaData.get('fullTitle').split(' ').filter(el => isDateElement(el)).join(' '),
  city: state.metaData.get('city'),
  area: state.metaData.get('area'),
});

export default wrap(mapStateToProps)(ElectionDetails);

