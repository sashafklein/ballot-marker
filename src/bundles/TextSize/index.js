import React from 'react';
import { View, Text } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import TextSizeButton from './TextSizeButton';
import gbs from '../../shared/styles';

import { transformFontSizes } from '../../shared/utils/styles';

// Export an unconnected version for testing
export const TextSize = ({ textSize }) => {
  const text = transformFontSizes(gbs.t, textSize);

  return (
    <PageWithActions onBack={ Actions.pop }>
      <View style={ gbs.l.centeredContainer }>
        <Text style={ [text.p, gbs.l.p]}>Choose text size and color:</Text>
        {
          ['small', 'medium', 'large'].map((size, i) => (
            <TextSizeButton size={ size } key={ i } />
          ))
        }
      </View>
    </PageWithActions>
  );
};

TextSize.propTypes = {};

const mapStateToProps = state => ({
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(TextSize);

