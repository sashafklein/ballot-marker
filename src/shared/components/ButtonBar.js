import React from 'react';
import { View } from 'react-native';
import NavButton from './NavButton';
import { wrap } from '../wrap';

export const ButtonBar = ({ items, gbs, style, textStyle }) => {
  if (items && items.length) {
    // Full width minus side and internal margins
    const barWidth = gbs.s.percWidth100 - (2 * gbs.l.navButtonOffset);
    const buttonWidth = (barWidth - ((items.length - 1) * gbs.l.navButtonOffset)) / items.length;
    return (
      <View
        style={ [
          {
            height: gbs.l.buttonHeight + (gbs.l.navButtonOffset),
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            position: 'absolute',
            width: barWidth,
            marginLeft: gbs.l.navButtonOffset,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          },
          style
        ] }
      >
        {
          items.map((item, index) => (
            <NavButton
              textStyle={ textStyle }
              buttonStyle={ { maxWidth: buttonWidth, minWidth: buttonWidth }}
              { ...item }
              key={ index }
            />
          ))
        }
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
