import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import gbs from '../styles';
import { styleCombiner, transformFontSizes } from '../utils/styles';

import Link from './Link';

export const Button = ({ onPress, children, replaceStyles, addStyles, textSize }) => {
  const text = transformFontSizes(gbs.t, textSize);

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
      fontSize: text.h3.fontSize,
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
  addStyles: oneOfType([object, array]),
  textSize: string
};

Button.defaultProps = {
  replaceStyles: {},
  addStyles: {}
};

const mapStateToProps = state => ({
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(Button);
