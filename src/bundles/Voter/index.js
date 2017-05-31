/* eslint no-underscore-dangle:0 */

import React from 'react';
import { Text, View, ListView, ScrollView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { fromJS } from 'immutable';
import { listOf, map, contains } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import VoterRow from './VoterRow';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';
import { straightPartyVote } from '../../store/thunkActions';
import { numberToWord } from '../../shared/utils/string';

const rows = contest => {
  const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });
  const rowArray = contest.get('options').toJS().map((opt, index) => Object.assign({}, opt, { isLast: index === contest.size - 1 }));
  if (contest.get('type') === 'CandidateContest') {
    rowArray.push('write-in');
  }
  return ds.cloneWithRows(rowArray);
};

// Export an unconnected version for testing
export class Voter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: rows(props.contest)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: rows(newProps.contest)
    });
  }

  pushesAboveLimit(entry) {
    const { selections, contest } = this.props;

    return selections.size >= contest.get('voteLimit')
      && (
        typeof entry === 'string'
          ? !(typeof selections.find(sel => typeof sel === 'string') === 'string')
          : !selections.includes(entry)
      );
  }

  raiseAboveLimitError() {
    const { gbs } = this.props;
    const messages = [
      <Text key={ 1 } style={ [gbs.t.p, gbs.t.bold] }>{ 'Uncheck the one you don\'t want.' }</Text>,
      <Text key={ 0 } style={ [gbs.t.p] }>Then choose the one you do.</Text>
    ];
    Actions.oops({ messages });
  }

  handleSelection(index) {
    const { selections, contest, dispatch } = this.props;

    if (this.pushesAboveLimit(index)) {
      this.raiseAboveLimitError();
    } else {
      const priorIndex = selections.indexOf(index);

      const nextSelections = priorIndex === -1
        ? selections.push(index) // Add the item index
        : selections.delete(priorIndex); // Remove the item index (at priorIndex)

      dispatch(setVote(contest.get('id'), nextSelections));
    }
  }

  handleWritein(text) {
    const { selections, contest, dispatch } = this.props;

    if (this.pushesAboveLimit(text)) {
      this.raiseAboveLimitError();
    } else {
      const priorIndex = selections.findIndex(sel => typeof sel === 'string');
      const nextSelections = priorIndex === -1
        ? selections.push(text) // Add the write-in text
        : selections.set(priorIndex, text); // Update the write-in text
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
    }[contest.get('type')] || `Select ${numberToWord(contest.get('voteLimit'))} candidate`;

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
      {
        onPress: Actions.reviewVotes,
        content: 'Review Votes',
        colorKey: 'flat'
      }
    ];

    return (
      <PageWithActions
        onBack={ Actions.pop }
        onNext={ () => Actions.voter({ contestIndex: contestIndex + 1 }) }
        headerItems={ headerItems }
      >
        <ScrollView>
          <View style={ [gbs.l.centeredContainer, { marginTop: gbs.l.buttonHeight }] }>
            <View style={ gbs.l.h1 }>
              <Text style={ [gbs.t.h3, gbs.t.bold, { textAlign: 'center' }] }>{ contest.get('name') }</Text>
              <Text style={ [gbs.t.p, { textAlign: 'center' }] }>{ instructions }</Text>
              {
                contest.get('text') &&
                  <Text style={ [gbs.t.p, gbs.l.p] }>{ contest.get('text') }</Text>
              }
            </View>
            <ListView
              style={ { flex: 1, flexDirection: 'column' }}
              dataSource={ this.state.dataSource }
              renderRow={ opt => {
                if (opt === 'write-in') {
                  return (
                    <TextInput
                      onChangeText={ t => { this.handleWritein(t); } }
                      style={ [
                        gbs.t.p,
                        { fontFamily: 'Avenir', minHeight: 40, borderColor: gbs.c.flat, borderWidth: 1 },
                        { marginBottom: opt.isLast
                          ? gbs.l.buttonHeight
                          : 0
                        }
                      ] }
                      onFocus={ () => {
                        if (this.pushesAboveLimit('text')) {
                          this.raiseAboveLimitError();
                        }
                      }}
                      multiline
                      defaultValue="Touch here to write in another candidate"
                      value={ this.state.writeIn }
                    />
                  );
                } else {
                  return (
                    <VoterRow
                      selected={ selections.includes(opt.index) }
                      { ...optionMapper(opt) }
                    />
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

const { object, number, string, func, oneOf, oneOfType } = React.PropTypes;
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
  selections: listOf(oneOfType([number, string])).isRequired,
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

