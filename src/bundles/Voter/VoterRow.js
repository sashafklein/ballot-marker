import React from 'react';
import { View, Switch, Text } from 'react-native';
import { kebabCase } from 'lodash';

import { wrap } from '../../shared/wrap';

export const VoterRow = ({ title, subtitle, selected, onValueChange, gbs }) => {
  const subtitleComponent = subtitle
    ? (
      <Text
        style={ [
          gbs.t.small,
          { lineHeight: gbs.s.percHeight5 - 5, marginBottom: 3 }
        ] }
      >
        { subtitle.toUpperCase() }
      </Text>
    )
    : null;

  return (
    <View
      style={ [
        gbs.w.mv5,
        { marginHorizontal: gbs.percWidth5, height: gbs.s.percHeight10, flexDirection: 'row', width: gbs.s.percWidth90, flex: 1 }
      ] }
    >
      <View style={{ width: gbs.s.percWidth70, flex: 7, height: gbs.s.percHeight10 }}>
        <View style={ { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' } }>
          <Text
            style={ [
              gbs.t.p,
              subtitle ? { lineHeight: gbs.s.percHeight5 - 5 } : { lineHeight: gbs.s.percHeight10 - 10 },
              { marginTop: 3 }
            ] }
          >
            { title }
          </Text>
          { subtitleComponent }
        </View>
      </View>
      <View style={ { width: gbs.s.percWidth20, flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: gbs.l.percHeight10, flex: 2 } }>
        <View style={{ alignSelf: 'center' }}>
          <Switch
            value={ selected }
            onValueChange={ () => { onValueChange(!selected); } }
            testID={ kebabCase(title) }
          />
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
