import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import gbs from '../../shared/styles';
import Button from '../../shared/components/Button';
import { changeSetting } from '../../store/actions';
import { transformFontSizes } from '../../shared/utils/styles';

const sizes = {
  small: transformFontSizes({ p: gbs.t.p }, 'small').p.fontSize,
  medium: transformFontSizes({ p: gbs.t.p }, 'medium').p.fontSize,
  large: transformFontSizes({ p: gbs.t.p }, 'large').p.fontSize,
};

// Export an unconnected version for testing
export const TextSizeButton = ({ size, textSize, dispatch }) => (
  <Button
    addStyles={{
      text: {
        fontSize: sizes[size]
      },
      button: [
        gbs.l.button,
        {
          height: 80,
          backgroundColor: size === textSize ? gbs.c.green : gbs.c.black
        }
      ]
    }}
    onPress={
      () => {
        dispatch(changeSetting('textSize', size));
      }
    }
  >
    { size[0].toUpperCase() + size.slice(1) }
  </Button>
);

const { func, string } = React.PropTypes;
TextSizeButton.propTypes = {
  dispatch: func,
  size: string,
  textSize: string
};

const mapStateToProps = state => ({
  textSize: state.settings.get('textSize')
});

export default compose(connect(mapStateToProps))(TextSizeButton);
