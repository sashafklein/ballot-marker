import React from 'react';
import Button from './Button';
import { wrap } from '../wrap';

export const NavButton = ({ onPress, content, colorKey, gbs }) => (
  <Button
    onPress={ onPress || (() => {})}
    replaceStyles={ {
      button: [
        {
          height: gbs.s.percHeight10,
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        },
        { backgroundColor: gbs.c[colorKey] },
        onPress ? {} : { backgroundColor: gbs.c.lightGrey }
      ]
    } }
  >
    { content }
  </Button>
);

const { func, string, element, object, oneOfType } = React.PropTypes;
NavButton.propTypes = {
  onPress: func,
  content: oneOfType([string, element]).isRequired,
  colorKey: string.isRequired,
  gbs: object
}

export default wrap()(NavButton);
