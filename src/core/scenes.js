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
import ReviewVotes from '../bundles/ReviewVotes';

export default Actions.create(
  <Scene key="root">
    <Scene key="launch" component={ Launch } title="Launch" hideNavBar />
    <Scene key="language" component={ Language } title="Language" hideNavBar />
    <Scene key="oops" component={ Oops } title="Oops" hideNavBar />
    <Scene key="headset" component={ Headset } title="Headset" hideNavBar />
    <Scene key="settings" component={ Settings } title="Text Size" hideNavBar />
    <Scene key="instructions" component={ Instructions } title="Instructions" hideNavBar />
    <Scene key="electionDetails" component={ ElectionDetails } title="ElectionDetails" hideNavBar />
    <Scene key="voter" component={ Voter } title="Voter" hideNavBar />
    <Scene key="reviewVotes" component={ ReviewVotes } title="ReviewVotes" hideNavBar />
  </Scene>
);
