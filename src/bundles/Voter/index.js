import React from 'react';
import { Text, View, ListView, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { fromJS } from 'immutable';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';

const createOptionsObjects = (rawOptions, selections) => rawOptions.map(option => ({
  text: option,
  selected: selections.includes(option)
})).toJS();

const VoteRow = ({ option, onValueChange, gbs }) => {
  return (
    <View>
      <Switch
        value={ option.selected }
        onValueChange={ () => { onValueChange(option.text); } }
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
    const options = createOptionsObjects(props.rawOptions, props.selections);

    this.state = {
      dataSource: ds.cloneWithRows(options),
      selected: []
    };
  }

  componentWillReceiveProps({ selections, rawOptions }) {
    if (selections !== this.props.selections) {
      const ds = new ListView.DataSource({ rowHasChanged: () => (r1, r2) => r1 !== r2 });
      const options = createOptionsObjects(rawOptions, selections);

      this.setState({
        dataSource: ds.cloneWithRows(options)
      });
    }
  }

  handleSelection(selection) {
    const { selections, selectionLimit, dispatch, contestIndex, gbs } = this.props;

    if (selections.size >= selectionLimit) {
      const messages = [
        <Text key={ 1 } style={ [gbs.t.p, gbs.t.bold] }>{ 'Uncheck the one you don\'t want.' }</Text>,
        <Text key={ 0 } style={ [gbs.t.p] }>Then choose the one you do.</Text>
      ];
      Actions.oops({ messages });
    } else {
      const nextSelections = selections.includes(selection)
        ? _.without(selections.toJS(), selection)
        : [...selections.toJS(), selection];

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

const { object, array, number, string, func } = React.PropTypes;
Voter.propTypes = {
  gbs: object,
  rawOptions: object,
  selections: object,
  selectionLimit: number,
  contestIndex: number,
  name: string,
  dispatch: func
};

Voter.defaultProps = {
  rawOptions: fromJS([ 'Option 1', 'Option 2', 'Option 3' ]),
  selectionLimit: 2,
  contestIndex: 0
};

const mapStateToProps = (state, props) => {
  const contest = state.data.getIn(['Election', 'ContestCollection', 'Contest', props.contestIndex || 0]);
  const selections = state.selections.get(props.contestIndex || 0) || fromJS([]);

  return {
    selections,
    selectionLimit: contest.get('NumberElected'),
    // rawOptions: contest.get('BallotSelection'),
    name: contest.get('Name')
  };
};

export default wrap(mapStateToProps)(Voter);

