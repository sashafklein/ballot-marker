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
      borderRadius: 2,
      shadowColor: '#000000',
      height: gbs.l.buttonHeight,
      shadowOpacity: 0.8,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 0
      },
      flex: 1,
    }],
    text: {
      color: gbs.c.buttonText,
      alignSelf: 'center',
      fontSize: gbs.t.h3.fontSize,
      textDecorationLine: 'none',
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center'
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

const mapStateToProps = s => ({ settings: s.settings });

export default wrap(mapStateToProps)(Button);
