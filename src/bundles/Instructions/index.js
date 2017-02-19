import React from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import TextManifest from '../../shared/components/TextManifest';
import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export const Instructions = ({ gbs, showNext }) => {
  let headerItems;
  if (showNext) {
    headerItems = [{
      content: 'Settings', onPress: () => Actions.settings({ fromVote: true }), colorKey: 'green'
    }];
  }
  return (
    <PageWithActions
      onBack={ Actions.pop }
      onNext={ showNext ? Actions.electionDetails : undefined }
      headerItems={ headerItems }
      next={ showNext ? 'Next' : null }
    >
      <View style={ gbs.l.centeredContainer }>
        <ScrollView>
          <TextManifest
            textArray={ [
              [{ h3: 'How to vote' }],
              [{ b: 'To vote for the candidate of your choice, ' }, { p: 'choose that person\'s name.' }],
              [{ b: 'If you want to change your vote or if you make a mistake' }, { p: 'uncheck the one you don\'t want. Then choose the one you do want' }],
              [{ b: 'To write in a candidate: To vote for a person who is not on the ballot, ' }, { p: 'choose "Write in a name"' }],
              [{ b: 'You do not have to vote in every race. ' }, { p: 'Your ballot will be counted even if you do not vote in every race.' }]
            ]}
          />
        </ScrollView>
      </View>
    </PageWithActions>
  );
};

const { object, bool } = React.PropTypes;
Instructions.propTypes = {
  gbs: object,
  showNext: bool
};

Instructions.defaultProps = {
  showNext: true
};

export default wrap()(Instructions);

