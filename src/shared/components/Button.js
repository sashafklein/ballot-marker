import React from 'react';

import gbs from '@shared/theme';
import { styleCombiner } from '@utils/styles';

import Link from './Link';

const Button = ({ onPress, children, replaceStyles, addStyles }) => {
  const defaultStyles = {
    button: {
      backgroundColor: gbs.c.black,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    text: {
      color: gbs.c.white,
      paddingHorizontal: 20,
      paddingVertical: 5,
      alignSelf: 'center',
      fontSize: gbs.t.h2.fontSize
    }
  };

  const combiner = styleCombiner(defaultStyles, addStyles, replaceStyles);
  return (
    <Link
      onPress={ onPress }
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
