import React from 'react';
import Button from './Button';
import { wrap } from '../wrap';

export const NavButton = ({ onPress, content, colorKey, gbs, textStyle, buttonStyle }) => (
  <Button
    onPress={ onPress || (() => {})}
    addStyles={ {
      button: [
        {
          height: gbs.s.percHeight10 - 10,
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
          marginVertical: 5
        },
        { backgroundColor: gbs.c[colorKey] },
        onPress ? {} : { backgroundColor: gbs.c.flat },
        buttonStyle
      ],
      text: [textStyle]
    } }
  >
    { content }
  </Button>
);

const { func, string, element, object, oneOfType, array } = React.PropTypes;
NavButton.propTypes = {
  onPress: func,
  content: oneOfType([string, element]).isRequired,
  colorKey: string.isRequired,
  gbs: object,
  textStyle: oneOfType([object, array]),
  buttonStyle: oneOfType([object, array])
};

export default wrap()(NavButton);
