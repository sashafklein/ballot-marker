import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Launch from '../bundles/Launch';
import Headset from '../bundles/Headset';
import Language from '../bundles/Language';
import Oops from '../bundles/Oops';

export default Actions.create(
  <Scene key="root">
    <Scene key="launch" component={ Launch } title="Launch" />
    <Scene key="language" component={ Language } title="Language" />
    <Scene key="oops" component={ Oops } title="Oops" />
    <Scene key="headset" component={ Headset } title="Headset" />
  </Scene>
);
