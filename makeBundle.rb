bundle = ARGV[0]

if bundle && bundle.length > 0
  `mkdir src/bundles/#{bundle}`
  `mkdir src/bundles/#{bundle}/components`
  `mkdir src/bundles/#{bundle}/components/#{bundle}`
  `touch src/bundles/#{bundle}/components/#{bundle}/index.js`
  `touch src/bundles/#{bundle}/components/#{bundle}/styles.js`

  `mkdir src/bundles/#{bundle}/containers/`
  `mkdir src/bundles/#{bundle}/containers/#{bundle}Container`
  `touch src/bundles/#{bundle}/containers/#{bundle}Container/connect.js`
  `touch src/bundles/#{bundle}/containers/#{bundle}Container/index.js`

  `mkdir src/bundles/#{bundle}/scenes/`
  `mkdir src/bundles/#{bundle}/scenes/#{bundle}Scene`
  `touch src/bundles/#{bundle}/scenes/#{bundle}Scene/styles.js`
  `touch src/bundles/#{bundle}/scenes/#{bundle}Scene/index.js`

  `touch src/bundles/#{bundle}/scenes/index.js`
  `touch src/bundles/#{bundle}/package.json`

  index = %Q(/* @flow */

import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

type Props = {

};

const #{bundle} = (props: Props): React$Element<any> => {
  return (

  );
};

#{bundle}.defaultProps = {

};

export default #{bundle};

)

styles = %Q(/* @flow */

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    width: 40,
    textAlign: 'center',
  },
});

export default styles;

)

connect = %Q(/* @flow */

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { } from '@store/modules/#{bundle.downcase}';

const mapStateToProps = (state) => ({
  #{bundle.downcase}: state.#{bundle.downcase},
})

const mapActionsToProps = { };

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container);

)

container = %Q(/* @flow */

import React, { Component } from 'react';
import #{bundle} from '@#{bundle}/components/#{bundle}';
import connect from './connect';

type Props = {

};

const #{bundle}Container = (props: Props) => (
  <#{bundle} />
);

export default connect(#{bundle}Container);

)

scene = %Q(/* @flow */

import React from 'react';
import { View } from 'react-native';
import Title from '@components/Title';
import #{bundle}Container from '@#{bundle}/containers/#{bundle}Container';
import styles from './styles';

const #{bundle}Scene = (): React$Element<any> => {
  return (
    <View style={styles.container}>
      <Title>#{bundle}</Title>
      <#{bundle}Container />
    </View>
  );
};

export default #{bundle}Scene;

)

scene_styles = %Q(/* @flow */

import { StyleSheet } from 'react-native';
import { DEFAULT_BACKGROUND_COLOR } from '@theme/colors';

const styles = StyleSheet.create({
  container: {

  },
});

export default styles;

)

scene_index = %Q(/* @flow */

export #{bundle}Scene from './#{bundle}Scene';

)

  `echo "#{connect}" > src/bundles/#{bundle}/containers/#{bundle}Container/connect.js`
  `echo "#{container}" > src/bundles/#{bundle}/containers/#{bundle}Container/index.js`
  `echo "#{scene_index}" > src/bundles/#{bundle}/scenes/index.js`
  `echo "#{scene}" > src/bundles/#{bundle}/scenes/#{bundle}Scenes/index.js`
  `echo "#{scene_styles}" > src/bundles/#{bundle}/scenes/#{bundle}Scenes/styles.js`
  `echo "#{styles}" > src/bundles/#{bundle}/components/#{bundle}/styles.js`
  `echo "#{index}" > src/bundles/#{bundle}/components/#{bundle}/index.js`

package = %Q({
  \"name\": \"@#{bundle}\"
})

  `echo "#{package}" > src/bundles/#{bundle}/package.json`

module_index = %Q(/* @flow */

import type { #{package} } from './types';

type Action = {
  type: string,
};

const FAKE_ACTION = 'FAKE_ACTION';

export default function counter(state: Counter = 0, action: Action): Counter {
  switch (action.type) {
    case FAKE_ACTION:
      return state + 1
    default:
      return state
  }
};

export const increment = (): Action => ({
  type: FAKE_ACTION,
});

)

module_types = %Q(/* @flow */

export type Counter = number;

)

 `mkdir src/modules/#{package.downcase}`
 `touch src/modules/#{package.downcase}/index.js`
 `touch src/modules/#{package.downcase}/types.js`
 `echo #{module_index} > src/modules/#{package.downcase}/index.js`
 `echo #{module_types} > src/modules/#{package.downcase}/types.js`
else
  puts "No bundle name provided!"
end