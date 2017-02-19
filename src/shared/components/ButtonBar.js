import React from 'react';
import { View } from 'react-native';
import NavButton from './NavButton';
import { wrap } from '../wrap';

export const ButtonBar = ({ items, gbs }) => {
  if (items && items.length) {
    return (
      <View style={ { height: gbs.s.percHeight10 } }>
        <View
          style={ {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center'
          }}
        >
          {
            items.map((item, index) => (
              <NavButton
                key={ index }
                { ...item }
              />
            ))
          }
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const { object, array } = React.PropTypes;
ButtonBar.propTypes = {
  gbs: object,
  items: array
};

export default wrap()(ButtonBar);
