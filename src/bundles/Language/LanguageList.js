import React from 'react';
import { ListView } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from '../../shared/components/Button';
import languageData from '../../data/languages';
import { setErrorMessage } from '../../store/actions';
import gbs from '../../shared/styles';

export class LanguageList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(languageData),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={
          rowData => (
            <Button
              onPress={
                () => {
                  if (!rowData.error) return;
                  this.props.dispatch(setErrorMessage(rowData.error));
                  Actions.errorMessage();
                }
              }
              addStyles={{
                button: [{
                  width: gbs.s.percWidth80,
                  marginVertical: 20,
                  height: gbs.s.percHeight10
                }, rowData.name === 'English' && {
                  backgroundColor: gbs.c.green
                }]
              }}
            >
              { rowData.name }
            </Button>
          )
        }
      />
    );
  }
}

const { func } = React.PropTypes;
LanguageList.propTypes = {
  dispatch: func
};


const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps))(LanguageList);
