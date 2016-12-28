import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Link from '../../shared/components/Link';
import gbs from '../../shared/styles';

const Launch = () => {
  return (
    <View style={ gbs.l.centeredContainer }>
      <Link onPress={Actions.counter}>
        Go to counter
      </Link>
      <Link onPress={Actions.instructions}>
        Go to instructions
      </Link>
    </View>
  );
};

export default Launch;

