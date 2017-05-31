import React from 'react';
import { View } from 'react-native';
import ButtonBar from './ButtonBar';
import { wrap } from '../wrap';

export const PageWithActions = props => {
  const { onNext, onBack, children, back, next, gbs, headerItems } = props;

  const footerItems = [];
  if (back) { footerItems.push({ onPress: onBack, content: back, colorKey: 'negative' }); }
  if (next) { footerItems.push({ onPress: onNext, content: next, colorKey: 'positive' }); }

  const headerExists = headerItems && headerItems.length > 0;
  const footerExists = footerItems && footerItems.length > 0;

  const barCount = [headerExists, footerExists].filter(Boolean).length;

  const height = [
    gbs.s.percHeight100,
    gbs.s.percHeight100,
    gbs.s.percHeight100
  ][barCount];

  return (
    <View style={{ backgroundColor: gbs.c.bg }}>
      <ButtonBar
        items={ headerItems }
        textStyle={ [gbs.t.small, { alignSelf: 'center', textDecorationLine: 'none' }] }
        style={ { top: gbs.l.navButtonOffset } }
      />
      <View style={ { height, width: gbs.s.percWidth100 - 20, marginLeft: gbs.l.navButtonOffset, marginTop: barCount === 2 ? gbs.l.buttonHeight : 0 } }>
        { children }
      </View>
      <ButtonBar
        items={ footerItems }
        textStyle={ [gbs.t.p, { alignSelf: 'center', textDecorationLine: 'none' }] }
        style={ { bottom: gbs.l.navButtonOffset } }
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
