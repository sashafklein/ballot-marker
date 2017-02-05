import React from 'react';
import { View, ListView, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import PageWithActions from '../../shared/components/PageWithActions';
import { wrap } from '../../shared/wrap';
import { setVote } from '../../store/actions';

// Export an unconnected version for testing
export class Voter extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.options),
    };
  }

  handleSelection(selection) {
    const { selections, selectionLimit, dispatch, contestIndex } = this.props;
    if (selections.length >= selectionLimit) {
      const errors = [ 'Uncheck the one you don\'t want.', 'Then choose the one you do.' ];
      Actions.oops({ messages: errors });
    } else {
      const nextSelections = selections.indexOf(selection) === -1
        ? [...selections, selection]
        : _.without(selections, selection);
      dispatch(setVote(contestIndex, nextSelections));
    }
  }

  render() {
    const { gbs, name, selectionLimit, selections } = this.props;
    return (
      <PageWithActions onBack={ Actions.pop }>
        <View style={ gbs.l.centeredContainer }>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>{ name }</Text>
          <Text style={ [gbs.t.h1, gbs.l.h1] }>Select { selectionLimit }</Text>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ rowData => (
              <View>
                <Switch
                  value={ selections.indexOf(rowData) !== -1 }
                  onValueChange={ () => { this.handleSelection(rowData); } }
                  testID={ _.kebabCase(rowData) }
                />
                <Text style={ gbs.t.p }>{ rowData }</Text>
              </View>
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
  options: array,
  selections: array,
  selectionLimit: number,
  contestIndex: number,
  name: string,
  dispatch: func
};

Voter.defaultProps = {
  options: [ 'Option 1', 'Option 2' ],
  selectionLimit: 1,
  contestIndex: 'first'
};

const mapStateToProps = (state, props) => {
  const contest = state.data.getIn(['ContestCollection', props.contestIndex, 'Contest']);
  return {
    selections: state.selections.get(props.contestIndex),
    selectionLimit: contest.get('NumberElected'),
    options: contest.get('BallotSelections'),
    name: contest.get('Name')
  };
};

export default wrap(mapStateToProps)(Voter);

