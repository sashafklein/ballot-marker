import React from 'react';
import { View } from 'react-native';
import Title from '@components/Title';
import InstructionsContainer from '@Instructions/containers/InstructionsContainer';
import styles from './styles';

const InstructionsScene = () => {
  return (
    <View style={styles.container}>
      <Title>Instructions</Title>
      <InstructionsContainer />
    </View>
  );
};

export default InstructionsScene;
