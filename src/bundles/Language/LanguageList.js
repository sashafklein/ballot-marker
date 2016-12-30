import React from 'react';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { wrap } from '../../shared/wrap';

import Button from '../../shared/components/Button';
import languageData from '../../data/languages';
import { setErrorMessage } from '../../store/actions';

export class LanguageList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(languageData),
    };
  }

  render() {
    const { gbs } = this.props;
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
                  Actions.oops();
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

const { func, object } = React.PropTypes;
LanguageList.propTypes = {
  dispatch: func,
  gbs: object
};


const mapStateToProps = () => ({});

export default wrap(mapStateToProps)(LanguageList);
