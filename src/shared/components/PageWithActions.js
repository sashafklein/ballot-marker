import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import gbs from '../styles';
import Button from './Button';

export const PageWithActions = props => {
  const { onNext, onBack, children, back, next } = props;

  const button = (onPress, text, colorKey) => (
    text && <Button
      onPress={ onPress || (() => {}) }
      replaceStyles={ {
        button: [
          {
            height: gbs.s.percHeight10,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
          },
          { backgroundColor: gbs.c[colorKey] },
          onPress ? {} : { backgroundColor: gbs.c.lightGrey }
        ]
      } }
    >
      { text }
    </Button>
  );

  return (
    <View style={ { flex: 1 } }>
      <View style={ { height: gbs.s.percHeight90 } }>
        { children }
      </View>
      <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', height: gbs.s.percHeight10 } }>
        { button(onBack, back, 'red') }
        { button(onNext, next, 'green') }
      </View>
    </View>
  );
};

const { element, func, string, oneOfType, array } = React.PropTypes;
PageWithActions.propTypes = {
  children: oneOfType([element, array]).isRequired,
  onNext: func,
  onBack: func,
  next: string,
  back: string
};

PageWithActions.defaultProps = {
  next: 'Next',
  back: 'Back'
};

const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps))(PageWithActions);
