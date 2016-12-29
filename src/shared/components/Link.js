import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import gbs from '../styles';
import { styleCombiner, transformFontSizes } from '../utils/styles';

export const Link = ({ onPress, children, addStyles, replaceStyles, activeOpacity, textSize }) => {
  const text = transformFontSizes(gbs.t, textSize);

  const styles = {
    text: {
      fontSize: text.p.fontSize,
      textAlign: 'center',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: gbs.c.black,
      color: gbs.c.black,
      alignSelf: 'center',
    },
    link: {
      flex: 1,
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  };

  const combiner = styleCombiner(styles, addStyles, replaceStyles);
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ combiner('link') }
      activeOpacity={ activeOpacity }
    >
      <Text style={ combiner('text') }>{children}</Text>
    </TouchableOpacity>
  );
};

const { func, string, object, oneOfType, array, number } = React.PropTypes;
Link.propTypes = {
  onPress: func,
  children: string,
  addStyles: oneOfType([object, array]),
  replaceStyles: oneOfType([object, array]),
  activeOpacity: number,
  textSize: string
};

Link.defaultProps = {
  children: '',
  activeOpacity: 0.2
};

const mapStateToProps = state => ({
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(Link);
