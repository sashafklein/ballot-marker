import React from 'react';
import { View, Text } from 'react-native';
import { wrap } from '../wrap';

export const TextManifest = props => {
  const { textArray, gbs, paragraphSpacing, textStyles, styles } = props;

  const pSpacing = paragraphSpacing || gbs.w.mv7_5;

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
          <Text key={ lineIndex } style={ pSpacing }>
            {
              lines.map((lineObj, textIndex) => {
                const tag = Object.keys(lineObj)[0];
                const text = lineObj[tag];
                return (
                  <Text key={ textIndex } style={ [lineStyles[tag], textStyles] }>
                    {
                      textIndex === 0
                        ? text
                        : ' '.concat(text) // Extra space between text fields on same line
                    }
                  </Text>
                );
              })
            }
          </Text>
        ))
      }
    </View>
  );
};

const { array, object, oneOfType } = React.PropTypes;
TextManifest.propTypes = {
  textArray: array,
  gbs: object,
  paragraphSpacing: object,
  textStyles: object,
  styles: oneOfType([array, object])
};

export default wrap()(TextManifest);
