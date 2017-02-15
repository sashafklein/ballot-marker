/* eslint no-underscore-dangle:0 */
import React from 'react';
import { Text, View, ListView, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { fromJS } from 'immutable';
import { list } from 'react-immutable-proptypes';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';

const createOptionsObjects = (options, selections) => options
  .map(option => Object.assign(option, { selected: selections.includes(options) }));

const VoteRow = ({ option, onValueChange, gbs }) => {
  return (
    <View>
      <Switch
        value={ option.selected }
        onValueChange={ () => { onValueChange(option); } }
        testID={ _.kebabCase(option.text) }
      />
      <Text style={ gbs.t.p }>{ option.text }</Text>
    </View>
  );
};

// Export an unconnected version for testing
export class Voter extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });
    const options = createOptionsObjects(props.options, props.selections);

    this.state = {
      dataSource: ds.cloneWithRows(options),
      selected: []
    };
  }

  componentWillReceiveProps({ selections, options }) {
    if (selections !== this.props.selections) {
      debugger
      const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });

      this.setState({
        dataSource: ds.cloneWithRows(createOptionsObjects(options, selections))
      });
    }
  }

  handleSelection(selection) {
    const { selections, selectionLimit, dispatch, contestIndex, gbs } = this.props;
    const cleanedSelection = _.omit(selection, 'selected');

    if (selections.size >= selectionLimit) {
      const messages = [
        <Text key={ 1 } style={ [gbs.t.p, gbs.t.bold] }>{ 'Uncheck the one you don\'t want.' }</Text>,
        <Text key={ 0 } style={ [gbs.t.p] }>Then choose the one you do.</Text>
      ];
      Actions.oops({ messages });
    } else {
      const nextSelections = selections.includes(cleanedSelection)
        ? _.without(selections.toJS(), cleanedSelection)
        : [...selections.toJS(), cleanedSelection];

      dispatch(setVote(contestIndex, nextSelections));
    }
  }

  render() {
    const { gbs, name, selectionLimit } = this.props;
    return (
      <PageWithActions onBack={ Actions.pop }>
        <View style={ gbs.l.centeredContainer }>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>{ name }</Text>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>Select { selectionLimit }</Text>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ rowData => (
              <VoteRow
                option={ rowData }
                onValueChange={ this.handleSelection.bind(this) }
                gbs={ gbs }
              />
            ) }
          />
        </View>
      </PageWithActions>
    );
  }
}

const { object, number, string, func, array } = React.PropTypes;
Voter.propTypes = {
  gbs: object,
  options: array,
  selections: list,
  selectionLimit: number,
  contestIndex: number,
  name: string,
  dispatch: func
};

Voter.defaultProps = {
  options: [ 'Option 1', 'Option 2', 'Option 3' ]
    .map(opt => ({ text: opt, id: opt })),
  selectionLimit: 2,
  contestIndex: 0
};

const mapStateToProps = (state, props) => {
  const selections = state.selections.get(props.contestIndex || 3) || fromJS([]);
  const contest = state.contests.get(props.contextIndex || 3);

  return {
    selections,
    selectionLimit: contest.get('voteLimit'),
    name: contest.get('Name')
  };
};

export default wrap(mapStateToProps)(Voter);

