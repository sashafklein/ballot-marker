import React from 'react';

import globalStyles from '../../shared/styles';
import Button from '../../shared/components/Button';
import { wrap } from '../../shared/wrap';
import { changeSetting } from '../../store/actions';
import { transformFontSizes } from '../../shared/utils/styles';

const sizes = {
  small: transformFontSizes({ p: globalStyles.t.p }, 'small').p.fontSize,
  medium: transformFontSizes({ p: globalStyles.t.p }, 'medium').p.fontSize,
  large: transformFontSizes({ p: globalStyles.t.p }, 'large').p.fontSize,
};

// Export an unconnected version for testing
export const TextSizeButton = ({ size, textSize, dispatch, gbs }) => {
  return (
    <Button
      addStyles={{
        text: {
          fontSize: sizes[size],
          color: gbs.c.buttonText
        },
        button: [
          gbs.l.button,
          {
            height: gbs.s.percHeight10,
            backgroundColor: size === textSize
              ? gbs.c.buttonBg
              : gbs.c.flat,
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
};

const { func, string, object } = React.PropTypes;
TextSizeButton.propTypes = {
  dispatch: func,
  size: string,
  textSize: string,
  gbs: object
};

const mapStateToProps = state => ({
  textSize: state.settings.get('textSize')
});

export default wrap(mapStateToProps)(TextSizeButton);
