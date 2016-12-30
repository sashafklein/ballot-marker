import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styleCombiner } from '../utils/styles';
import { wrap } from '../wrap';

export const Link = ({ onPress, children, addStyles, replaceStyles, activeOpacity, gbs }) => {
  const styles = {
    text: {
      fontSize: gbs.t.p.fontSize,
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
  gbs: object
};

Link.defaultProps = {
  children: '',
  activeOpacity: 0.2
};

const mapStateToProps = () => ({});

export default wrap(mapStateToProps)(Link);
