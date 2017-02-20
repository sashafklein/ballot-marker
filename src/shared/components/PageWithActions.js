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
  const headerHeight = headerExists ? gbs.s.percHeight10 : 0;

  const footerHeight = footerExists ? gbs.s.percHeight10 : 0;

  const viewStyles = {
    height: gbs.s.percHeight100 - headerHeight - footerHeight
  };

  return (
    <View style={{ backgroundColor: gbs.c.bg }}>
      <ButtonBar
        items={ headerItems }
        textStyle={ [gbs.t.small, { alignSelf: 'center', textDecorationLine: 'none' }] }
      />
      <View style={ viewStyles }>
        <View style={{ height: 10 }} />
        { children }
      </View>
      <ButtonBar items={ footerItems } />
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
