import React from 'react';
import { View } from 'react-native';
import ButtonBar from './ButtonBar';
import { wrap } from '../wrap';

export const PageWithActions = props => {
  const { onNext, onBack, children, back, next, gbs, headerItems } = props;

  const footerItems = [];
  if (back) { footerItems.push({ onPress: onBack, content: back, colorKey: 'red' }) }
  if (next) { footerItems.push({ onPress: onNext, content: next, colorKey: 'green' }) }

  return (
    <View style={ { flex: 1 } }>
      <ButtonBar items={ headerItems } gbs={ gbs } />
      <View style={ {
        height: headerItems && headerItems.length > 0 ?
          gbs.s.percHeigh80 :
          gbs.s.percHeight90
        } }>
        { children }
      </View>
      <ButtonBar items={ footerItems } gbs={ gbs } />
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
