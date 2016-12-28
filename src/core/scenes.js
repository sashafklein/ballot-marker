import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Launch from '../bundles/Launch';
import { Counter } from '../bundles/Counter/scenes';
import Instructions from '../bundles/Instructions';

export default Actions.create(
  <Scene key="root">
    <Scene key="instructions" component={ Instructions } title="Instructions" />
    <Scene key="launch" component={ Launch } title="Launch" />
    <Scene key="counter" component={ Counter } title="Counter" />
  </Scene>
);
