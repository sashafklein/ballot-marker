import React from 'react';

import { styleCombiner } from '../utils/styles';
import { wrap } from '../wrap';

import Link from './Link';

export const Button = ({ onPress, children, replaceStyles, addStyles, gbs }) => {
  const defaultStyles = {
    button: [{
      backgroundColor: gbs.c.buttonBg,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: gbs.s.percHeight10,
      borderRadius: 10,
    }, gbs.l.border(2, gbs.c.buttonBorder)],
    text: {
      color: gbs.c.buttonText,
      alignSelf: 'center',
      fontSize: gbs.t.h3.fontSize,
      textDecorationLine: 'none',
      fontFamily: 'Avenir',
      fontWeight: 'bold'
    }
  };

  const combiner = styleCombiner(defaultStyles, addStyles, replaceStyles);

  return (
    <Link
      onPress={ onPress }
      activeOpacity={ 0.8 }
      addStyles={ {
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
  addStyles: oneOfType([object, array]),
  gbs: object
};

Button.defaultProps = {
  replaceStyles: {},
  addStyles: {}
};

const mapStateToProps = () => ({});

export default wrap(mapStateToProps)(Button);
