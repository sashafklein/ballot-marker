import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import gbs from '@shared/theme';
import { styleCombiner } from '@utils/styles';

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

const Link = ({ onPress, children = '', addStyles, replaceStyles }) => {
  const combiner = styleCombiner(styles, addStyles, replaceStyles);
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ combiner('link') }
    >
      <Text style={ combiner('text') }>{children}</Text>
    </TouchableOpacity>
  );
};

const { func, string, object, oneOfType, array } = React.PropTypes;
Link.propTypes = {
  onPress: func,
  children: string,
  addStyles: oneOfType([object, array]),
  replaceStyles: oneOfType([object, array])
};

export default Link;
