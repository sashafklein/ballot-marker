import React from 'react';
import { View } from 'react-native';

import gbs from '@shared/theme';
import Button from './Button';

const PageWithActions = ({ onNext, onBack, children, back, next }) => {
  const style = {
    bottomBar: {
      backgroundColor: gbs.c.black
    },
    bottomBarInner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center'
    },
    next: {
      alignSelf: 'flex-end',
      backgroundColor: 'rgb(0, 151, 84)',
      height: gbs.f.percent(10)
    },
    back: {
      alignSelf: 'flex-end',
      backgroundColor: 'rgb(208, 58, 69)',
      height: gbs.f.percent(10)
    },
    nextDisabled: {
      backgroundColor: 'rgba(0, 151, 84, 0.2)'
    },
    backDisabled: {
      backgroundColor: 'rgba(208, 58, 69, 0.2)'
    }
  };


  return (
    <View style={ { flex: 1 } }>
      { children }
      <View style={ style.bottomBar }>
        <View style={ style.bottomBarInner }>
          {
            back &&
            <Button
              onPress={ onBack || (() => {}) }
              addStyles={ {
                button: [style.back, onBack ? {} : style.backDisabled]
              } }
            >
              { back }
            </Button>
          }
          <Button
            onPress={ onNext || (() => {}) }
            addStyles={ {
              button: [style.next, onNext ? {} : style.nextDisabled ]
            } }
          >
            { next }
          </Button>
        </View>
      </View>
    </View>
  );
};

const { element, func, string } = React.PropTypes;
PageWithActions.propTypes = {
  children: element.isRequired,
  onNext: func.isRequired,
  onBack: func,
  next: string,
  back: string
};

PageWithActions.defaultProps = {
  next: 'Next'
};
export default PageWithActions;
