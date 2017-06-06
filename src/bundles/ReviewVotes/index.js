import React from 'react';
import { View, ListView, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { list, map } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';

// Export an unconnected version for testing
export class ReviewVotes extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.contests
        .filter(c => c.get('type') !== 'PartyContest')
        .toJS()
      )
    };
  }

  render() {
    const { gbs, selections } = this.props;
    const headerItems = [
      {
        onPress: () => Actions.settings({ fromVote: true }),
        content: 'Settings',
        colorKey: 'flat'
      },
      {
        onPress: () => Actions.instructions({ showNext: false }),
        content: 'Help',
        colorKey: 'flat'
      },
    ];

    return (
      <PageWithActions
        back={ null }
        headerItems={ headerItems }
        next="Cast your vote"
      >
        <ScrollView style={ [{ backgroundColor: gbs.c.bg, }, gbs.l.scrollWithButtons] }>
          <View style={ gbs.l.centeredContainer }>
            <View style={ gbs.l.h1 }>
              <Text style={ [gbs.t.h4, gbs.t.bold] }>
                { 'Review what you\'re voting for.' }
              </Text>
              <Text style={ [gbs.t.p, gbs.t.bold, gbs.w.mv10] }>
                This screen shows everything you voted for.
              </Text>
              <Text style={ gbs.t.p }>
                Review it carefully. If you are ready to cast your ballot, touch
                <Text style={ [gbs.t.p, gbs.t.bold] }> Cast your vote.</Text>
              </Text>
            </View>

            <ListView
              style={ { flex: 1, alignSelf: 'center' }}
              dataSource={ this.state.dataSource }
              renderRow={ contest => {
                const selectionList = selections.get(contest.id);
                const title = (
                  <Text style={ [gbs.t.p, gbs.t.bold, gbs.w.mb5, gbs.w.mt15] }>
                    { contest.name }
                  </Text>
                );

                if (selectionList && selectionList.size > 0) {
                  const choices = contest.options.filter(opt => selectionList.includes(opt.index));

                  const writeIn = selectionList.find(sel => typeof sel === 'string');
                  if (writeIn) {
                    choices.push({ name: writeIn });
                  }
                  return (
                    <TouchableWithoutFeedback
                      onPress={ () => { Actions.voter({ contestIndex: contest.index }); }}
                    >
                      <View key={ contest.id } style={ [gbs.w.mv10] }>
                        { title }
                        {
                          choices.map((choice, index) => (
                            <View key={ index }>
                              <Text
                                style={ gbs.t.p }
                              >
                                { choice.name }
                              </Text>
                              {
                                choice.partyName &&
                                <Text style={ gbs.t.small }>
                                  { choice.partyName.toUpperCase() }
                                </Text>
                              }
                            </View>
                          ))
                        }
                      </View>
                    </TouchableWithoutFeedback>
                  );
                } else {
                  return (
                    <View key={ contest.id } style={ gbs.w.mv5 }>
                      { title }
                      <TouchableWithoutFeedback
                        onPress={ () => { Actions.voter({ contestIndex: contest.index }); }}
                      >
                        <View style={ { backgroundColor: gbs.c.pink, padding: 5, marginTop: 5, marginBottom: 10 } }>
                          <Text style={ gbs.t.p }>
                            You did not vote for anyone. If you want to vote, touch here.
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  );
                }
              } }
            />
          </View>
        </ScrollView>
      </PageWithActions>
    );
  }
}

const { object } = React.PropTypes;
ReviewVotes.propTypes = {
  gbs: object,
  contests: list,
  selections: map
};

const mapStateToProps = state => ({
  selections: state.selections,
  contests: state.contests
});

export default wrap(mapStateToProps)(ReviewVotes);

