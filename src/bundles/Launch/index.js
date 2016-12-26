import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Link from '@components/Link';
import gbs from '@shared/theme';

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

