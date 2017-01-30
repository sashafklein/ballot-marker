import React from 'react';
import { View } from 'react-native';
import NavButton from './NavButton';
import { wrap } from '../wrap';

export const ButtonBar = ({ items, gbs }) => {
  if (items && items.length) {
    return (
      <View
        style={ {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          height: gbs.s.percHeight10
        } }
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
    );
  } else {
    return null;
  }
};

export default wrap()(ButtonBar);
