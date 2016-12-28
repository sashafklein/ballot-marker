import React from 'react';

import gbs from '../styles';
import { styleCombiner } from '../utils/styles';

import Link from './Link';

const Button = ({ onPress, children, replaceStyles, addStyles }) => {
  const defaultStyles = {
    button: {
      backgroundColor: gbs.c.black,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: gbs.c.white,
      alignSelf: 'center',
      fontSize: gbs.t.h3.fontSize,
    }
  };

  const combiner = styleCombiner(defaultStyles, addStyles, replaceStyles);
  return (
    <Link
      onPress={ onPress }
      activeOpacity={ 0.8 }
      replaceStyles={ {
        link: combiner('button'),
        text: combiner('text')
      } }
    >
      { children }
    </Link>
  );
};

const { string, object, func, oneOfType, array } = React.PropTypes;
Button.propTypes = {
  children: string.isRequired,
  onPress: func.isRequired,
  replaceStyles: oneOfType([object, array]),
  addStyles: oneOfType([object, array])
};

Button.defaultProps = {
  replaceStyles: {},
  addStyles: {}
};

export default Button;
