import React from 'react';
import { View, Platform } from 'react-native';
import ButtonBar from './ButtonBar';
import { wrap } from '../wrap';

export const PageWithActions = props => {
  const { onNext, onBack, children, back, next, gbs, headerItems } = props;

  const footerItems = [];
  if (back) { footerItems.push({ onPress: onBack, content: back, colorKey: 'red' }); }
  if (next) { footerItems.push({ onPress: onNext, content: next, colorKey: 'green' }); }

  const baseTopPadding = Platform.OS === 'ios' ? 64 : 54;
  const headerExists = headerItems && headerItems.length > 0;
  const footerExists = footerItems && footerItems.length > 0;
  const headerHeight = headerExists ? gbs.s.percHeight10 : 0;

  const footerHeight = footerExists ? gbs.s.percHeight10 : 0;
  // debugger
  const viewStyles = {
    height: gbs.s.percHeight100 - headerHeight - footerHeight - baseTopPadding,
    marginTop: headerHeight + baseTopPadding
  };
  console.log(viewStyles)
  return (
    <View>
      <ButtonBar items={ headerItems } />
      <View style={ viewStyles }>
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
