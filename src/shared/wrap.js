import { compose } from 'recompose';
import { connect } from 'react-redux';
import gbs from './styles';
import { transformColors, transformFontSizes } from './utils/styles';

// For any component that needs global (translated) colors/font sizes,
// acts as a wrapper for the exported component, following a pattern similar to
// Redux's `connect`. Return props including global styles ("gbs")).
export const wrap = mapStateToProps => Component => compose(connect((state, ownProps) => {
  const connectedProps = (mapStateToProps && mapStateToProps(state, ownProps)) || {};

  const transformedGlobalStyles = Object.assign({}, gbs, {
    t: transformFontSizes(gbs.t, state.settings.get('textSize')),
    c: transformColors(gbs.c, state.settings.get('colorScheme'))
  });

  const finalProps = Object.assign(connectedProps, { gbs: transformedGlobalStyles }, ownProps);

  return finalProps;
}))(Component);
