import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '../wrap';

export const TextManifest = props => {
  const { textArray, gbs, paragraphSpacing, textStyles, styles } = props;

  const pSpacing = paragraphSpacing || gbs.w.mv5;

  const lineStyles = {
    h3: gbs.t.h3,
    p: gbs.t.p,
    b: [gbs.t.p, gbs.t.bold],
    h1: gbs.t.h1
  };

  return (
    <View style={ styles }>
      {
        textArray.map((lines, lineIndex) => (
          <View key={ lineIndex } style={ pSpacing }>
            {
              lines.map((lineObj, textIndex) => {
                const tag = Object.keys(lineObj)[0];
                const text = lineObj[tag];
                return (
                  <Text key={ textIndex } style={ [lineStyles[tag], textStyles] }>{ text }</Text>
                );
              })
            }
          </View>
        ))
      }
    </View>
  );
};

const { array, object } = React.PropTypes;
TextManifest.propTypes = {
  textArray: array,
  gbs: object,
  paragraphSpacing: object,
  textStyles: object,
  styles: array
};

export default wrap()(TextManifest);
