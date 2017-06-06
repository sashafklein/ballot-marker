import React from 'react';
import { View } from 'react-native';
import ButtonBar from './ButtonBar';
import { wrap } from '../wrap';

export const PageWithActions = props => {
  const { onNext, onBack, children, back, next, gbs, headerItems } = props;

  const footerItems = [];
  if (back) { footerItems.push({ onPress: onBack, content: back, colorKey: 'negative' }); }
  if (next) { footerItems.push({ onPress: onNext, content: next, colorKey: 'positive' }); }

  const height = gbs.s.percHeight100;

  return (
    <View style={{ backgroundColor: gbs.c.bg, flex: 1 }}>
      <View style={ { height, width: gbs.s.percWidth100, paddingHorizontal: gbs.l.navButtonOffset } }>
        { children }
      </View>
      <ButtonBar
        items={ headerItems }
        textStyle={ [gbs.t.small, { alignSelf: 'center', textDecorationLine: 'none' }] }
        style={ { top: 0 } }
      />
      <ButtonBar
        items={ footerItems }
        textStyle={ [gbs.t.p, { alignSelf: 'center', textDecorationLine: 'none' }] }
        style={ { bottom: 0, paddingBottom: gbs.l.navButtonOffset } }
      />
    </View>
  );
};

const { element, func, string, oneOfType, array, object, arrayOf } = React.PropTypes;
PageWithActions.propTypes = {
  children: oneOfType([element, array]).isRequired,
  onNext: func,
  onBack: func,
  next: string,
  back: string,
  gbs: object,
  headerItems: arrayOf(object)
};

PageWithActions.defaultProps = {
  next: 'Next',
  back: 'Back'
};

const mapStateToProps = () => ({});

export default wrap(mapStateToProps)(PageWithActions);
