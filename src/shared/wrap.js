import { compose } from 'recompose';
import { connect } from 'react-redux';
import gbs from './styles';
import { transformColors, transformFontSizes } from './utils/styles';

// For any component that needs global (translated) colors/font sizes,
// acts as a wrapper for the exported component, following a pattern similar to
// Redux's `connect`. Return props including global styles ("gbs")).
export const wrap = mapStateToProps => Component => compose(connect((state, ownProps) => {
  const connectedProps = (mapStateToProps && mapStateToProps(state, ownProps)) || {};

  const buttonHeightMultiple = {
    small: 0.75,
    medium: 1,
    large: 1.1
  }[state.settings.get('textSize')];

  const navMarginMultiple = {
    small: 1,
    medium: 1,
    large: 1.5
  }[state.settings.get('textSize')];

  const transformedGlobalStyles = Object.assign({}, gbs, {
    t: transformFontSizes(gbs.t, state.settings.get('textSize')),
    c: transformColors(gbs.c, state.settings.get('colorScheme')),
    l: Object.assign({}, gbs.l, {
      buttonHeight: gbs.l.buttonHeight * buttonHeightMultiple,
      navButtonOffset: gbs.l.navButtonOffset * navMarginMultiple
    })
  });

  const finalProps = Object.assign(connectedProps, { gbs: transformedGlobalStyles }, ownProps);

  return finalProps;
}))(Component);
