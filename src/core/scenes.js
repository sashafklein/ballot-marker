import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Launch from '../bundles/Launch';
import Headset from '../bundles/Headset';
import Language from '../bundles/Language';
import Oops from '../bundles/Oops';
import Settings from '../bundles/Settings';
import Instructions from '../bundles/Instructions';
import Voter from '../bundles/Voter';
import ElectionDetails from '../bundles/ElectionDetails';

export default Actions.create(
  <Scene key="root">
    <Scene key="launch" component={ Launch } title="Launch" />
    <Scene key="language" component={ Language } title="Language" />
    <Scene key="oops" component={ Oops } title="Oops" />
    <Scene key="headset" component={ Headset } title="Headset" />
    <Scene key="settings" component={ Settings } title="Text Size" />
    <Scene key="instructions" component={ Instructions } title="Instructions" />
    <Scene key="electionDetails" component={ ElectionDetails } title="ElectionDetails" />
    <Scene key="voter" component={ Voter } title="Voter" />
  </Scene>
);
