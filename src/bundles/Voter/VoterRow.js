import React from 'react';
import { View, Switch, Text } from 'react-native';
import { kebabCase } from 'lodash';

import { wrap } from '../../shared/wrap';

export const VoterRow = ({ title, subtitle, selected, onValueChange, gbs }) => {
  // debugger
  return (
    <View>
      <Switch
        value={ selected }
        onValueChange={ () => { onValueChange(!selected); } }
        testID={ title }
      />
      <Text style={ gbs.t.h4 }>{ title }</Text>
      <Text style={ gbs.t.p }>{ subtitle }</Text>
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
