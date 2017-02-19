import React from 'react';
import { View } from 'react-native';
import NavButton from './NavButton';
import { wrap } from '../wrap';

export const ButtonBar = ({ items, gbs, style, buttonStyle, textStyle }) => {
  if (items && items.length) {
    return (
      <View style={ [{ height: gbs.s.percHeight10 }, style] }>
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
                textStyle={ textStyle }
                buttonStyle={ buttonStyle }
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

const { object, array, oneOfType } = React.PropTypes;
ButtonBar.propTypes = {
  gbs: object,
  items: array,
  style: object,
  buttonStyle: oneOfType([object, array]),
  textStyle: oneOfType([object, array])
};

export default wrap()(ButtonBar);
