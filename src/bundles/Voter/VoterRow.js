import React from 'react';
import { View, Switch, Text } from 'react-native';
import { kebabCase } from 'lodash';

import { wrap } from '../../shared/wrap';

export const VoterRow = ({ title, subtitle, selected, onValueChange, gbs }) => {
  return (
    <View style={ [gbs.w.mv5, { marginHorizontal: gbs.percWidth5, height: gbs.s.percHeight10, flexDirection: 'row', width: gbs.s.percWidth90 }] }>
      <View style={ { width: gbs.s.percWidth15 } }>
        <Switch
          value={ selected }
          onValueChange={ () => { onValueChange(!selected); } }
          testID={ kebabCase(title) }
        />
      </View>
      <View style={{ width: gbs.s.percWidth70, marginLeft: gbs.s.percWidth5 }}>
        <View style={ { flexDirection: 'column' } }>
          <Text style={ [gbs.t.small, gbs.t.wrap] }>{ title }</Text>
          {
            subtitle &&
              <Text style={ [gbs.t.small, gbs.t.wrap] }>{ subtitle.toUpperCase() }</Text>
          }
        </View>
      </View>
    </View>
  );
};

const { string, func, object, bool } = React.PropTypes;
VoterRow.propTypes = {
  title: string.isRequired,
  subtitle: string,
  onValueChange: func.isRequired,
  selected: bool,
  gbs: object
};

export default wrap()(VoterRow);
