/* eslint no-underscore-dangle:0 */

import React from 'react';
import { Text, View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { fromJS } from 'immutable';
import { list } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import VoterRow from './VoterRow';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';
import optMap from './optMap';

// Export an unconnected version for testing
export class Voter extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.options.toJS())
    };
  }

  handleSelection(index) {
    const { selections, voteLimit, dispatch, contestIndex, gbs } = this.props;

    if (selections.size >= voteLimit) {
      const messages = [
        <Text key={ 1 } style={ [gbs.t.p, gbs.t.bold] }>{ 'Uncheck the one you don\'t want.' }</Text>,
        <Text key={ 0 } style={ [gbs.t.p] }>Then choose the one you do.</Text>
      ];
      Actions.oops({ messages });
    } else {
      const priorIndex = selections.indexOf(index);
      const nextSelections = priorIndex !== -1
        ? selections.delete(index)
        : selections.push(index);

      dispatch(setVote(contestIndex, nextSelections));
    }
  }

  render() {
    const { gbs, name, voteLimit, contestType, selections } = this.props;
    const optionMapper = optMap[contestType];
    return (
      <PageWithActions onBack={ Actions.pop }>
        <View style={ gbs.l.centeredContainer }>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>{ name }</Text>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>Select { voteLimit }</Text>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ opt => {
              return <VoterRow
                onValueChange={ () => { this.handleSelection(opt.index); } }
                gbs={ gbs }
                selected={ selections.get(opt.index) }
                { ...optionMapper(opt) }
              />
            } }
          />
        </View>
      </PageWithActions>
    );
  }
}

const { object, number, string, func } = React.PropTypes;
Voter.propTypes = {
  gbs: object,
  options: list,
  selections: list,
  voteLimit: number,
  contestIndex: number,
  name: string,
  dispatch: func,
  contestType: string
};

Voter.defaultProps = {
  contestIndex: 0
};

const mapStateToProps = (state, props) => {
  const selections = state.selections.get(props.contestIndex || 0) || fromJS([]);
  const contest = state.contests.get(props.contextIndex || 0);

  return {
    selections,
    voteLimit: contest.get('voteLimit'),
    name: contest.get('Name'),
    options: contest.get('options'),
    contestType: contest.get('type')
  };
};

export default wrap(mapStateToProps)(Voter);

