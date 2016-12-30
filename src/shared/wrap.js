import { compose } from 'recompose';
import { connect } from 'react-redux';
import gbs from './styles';
import { transformColors, transformFontSizes } from './utils/styles';

export const wrap = mapStateToProps => Component => compose(connect(state => {
  const connectedProps = mapStateToProps(state) || {};

  const transformedGlobalStyles = Object.assign(gbs, {
    t: transformFontSizes(gbs.t, state.settings.get('textSize')),
    c: transformColors(gbs.c, state.settings.get('colorScheme'))
  });

  const finalProps = Object.assign(connectedProps, { gbs: transformedGlobalStyles });

  return finalProps;
}))(Component);
