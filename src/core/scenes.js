import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Launch from '../bundles/Launch';
import { CounterScene } from '../bundles/Counter/scenes';
import Instructions from '../bundles/Instructions';
import Headset from '../bundles/Headset';

export default Actions.create(
  <Scene key="root">
    <Scene key="headset" component={ Headset } title="Headset" />
    <Scene key="instructions" component={ Instructions } title="Instructions" />
    <Scene key="launch" component={ Launch } title="Launch" />
    <Scene key="counter" component={ CounterScene } title="Counter" />
  </Scene>
);
