import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Instructions from '@Instructions/components/Instructions';
import connect from './connect';

const InstructionsContainer = () => (
  <View>
    <Instructions/>
  </View>
);

export default connect(InstructionsContainer);
