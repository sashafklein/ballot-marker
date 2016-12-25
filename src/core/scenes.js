/* @flow */

import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import { LaunchScene } from '@Launch/scenes'
import { CounterScene } from '@Counter/scenes'
import { InstructionsScene } from '@Instructions/scenes'

export default Actions.create(
  <Scene key="root">
    <Scene key="launch" component={LaunchScene} title="Launch" />
    <Scene key="counter" component={CounterScene} title="Counter" />
    <Scene key="instructions" component={InstructionsScene} title="Instructions" />
  </Scene>
)
