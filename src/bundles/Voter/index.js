/* eslint no-underscore-dangle:0 */

import React from 'react';
import { Text, View, ListView, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { fromJS } from 'immutable';
import { listOf, map, contains } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import VoterRow from './VoterRow';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';
import { straightPartyVote } from '../../store/thunkActions';

// Export an unconnected version for testing
export class Voter extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.contest.get('options').toJS())
    };
  }

  componentWillReceiveProps(newProps) {
    const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(newProps.contest.get('options').toJS())
    });
  }

  handleSelection(index) {
    const { selections, contest, dispatch, gbs } = this.props;
    const pushesAboveLimit = selections.size >= contest.get('voteLimit')
                              && !selections.includes(index);

    if (pushesAboveLimit) {
      const messages = [
        <Text key={ 1 } style={ [gbs.t.p, gbs.t.bold] }>{ 'Uncheck the one you don\'t want.' }</Text>,
        <Text key={ 0 } style={ [gbs.t.p] }>Then choose the one you do.</Text>
      ];
      Actions.oops({ messages });
    } else {
      const priorIndex = selections.indexOf(index);

      const nextSelections = priorIndex === -1
        ? selections.push(index) // Add the item index
        : selections.delete(priorIndex); // Remove the item index (at priorIndex)

      dispatch(setVote(contest.get('id'), nextSelections));
    }
  }

  render() {
    const { gbs, contest, selections, dispatch, contestIndex } = this.props;

    const optionMapper = {
      PartyContest: option => ({
        title: option.name,
        onValueChange: newVal => {
          this.handleSelection(option.index);
          dispatch(straightPartyVote(option.id, newVal));
        }
      }),
      CandidateContest: option => ({
        title: option.name,
        subtitle: option.partyName,
        onValueChange: () => this.handleSelection(option.index)
      }),
      BallotMeasureContest: option => ({
        title: option.name,
        onValueChange: () => this.handleSelection(option.index)
      })
    }[contest.get('type')];

    const instructions = {
      BallotMeasureContest: 'Select Yes or No'
    }[contest.get('type')] || `Select ${contest.get('voteLimit')}`;

    const headerItems = [
      {
        onPress: () => Actions.settings({ fromVote: true }),
        content: 'Settings',
        colorKey: 'lightGrey'
      },
      {
        onPress: () => Actions.instructions({ showNext: false }),
        content: 'Help',
        colorKey: 'lightGrey'
      },
      {
        onPress: Actions.reviewVotes,
        content: 'Review Votes',
        colorKey: 'lightGrey'
      }
    ];

    return (
      <PageWithActions
        onBack={ Actions.pop }
        onNext={ () => Actions.voter({ contestIndex: contestIndex + 1 }) }
        headerItems={ headerItems }
      >
        <ScrollView>
          <View style={ gbs.l.centeredContainer }>
            <View style={ gbs.l.h1 }>
              <Text style={ [gbs.t.h4, gbs.l.p] }>{ contest.get('name') }</Text>
              <Text style={ [gbs.t.p] }>{ instructions }</Text>
              {
                contest.get('text') &&
                  <Text style={ [gbs.t.small, gbs.l.p] }>{ contest.get('text') }</Text>
              }
            </View>
            <ListView
              style={ { flex: 1, flexDirection: 'column' }}
              dataSource={ this.state.dataSource }
              renderRow={ opt => (
                <VoterRow
                  gbs={ gbs }
                  selected={ selections.includes(opt.index) }
                  { ...optionMapper(opt) }
                />
              ) }
            />
          </View>
        </ScrollView>
      </PageWithActions>
    );
  }
}

const { object, number, string, func, oneOf } = React.PropTypes;
Voter.propTypes = {
  gbs: object,
  contest: contains({
    options: listOf(map),
    voteLimit: number.isRequired,
    name: string.isRequired,
    id: string.isRequired,
    type: oneOf(['PartyContest', 'CandidateContest', 'BallotMeasureContest']).isRequired
  }).isRequired,
  contestIndex: number.isRequired,
  selections: listOf(number).isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state, props) => {
  const contestIndex = props.contestIndex || 0;
  const contest = state.contests.get(contestIndex);
  const selections = state.selections.get(contest.get('id')) || fromJS([]);

  return {
    selections,
    contest,
    contestIndex
  };
};

export default wrap(mapStateToProps)(Voter);

