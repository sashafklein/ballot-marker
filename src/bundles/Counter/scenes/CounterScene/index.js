import React from 'react';
import { View } from 'react-native';
import CounterContainer from '@Counter/containers/CounterContainer';
import styles from './styles';

const CounterScene = () => {
  return (
    <View style={styles.container}>
      <CounterContainer />
    </View>
  );
};

export default CounterScene;
