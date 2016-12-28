bundle = ARGV[0]

raise "No bundle name provided!" unless bundle && bundle.length > 0

base = "src/bundles/#{bundle}"

`mkdir #{base}`
`mkdir #{base}/__specs__`
`touch #{base}/index.js`
`touch #{base}/__specs__/index.spec.js`
# `touch #{base}/package.json`

index = %Q(import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { PageWithActions } from '../../shared/components/PageWithActions';

// Export an unconnected version for testing
export const #{bundle} = () => (
  <PageWithActions back="Back">

  </PageWithActions>
);

const { func } = React.PropTypes;
#{bundle}.propTypes = {
  dispatch: func
};

const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps))(#{bundle});)

spec = %Q(/* eslint no-undef:0 */

import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { #{bundle} } from '../index.js';

describe('<#{bundle} />', () => {
  it('has a test', () => {
    expect(true).to.eq(false);
  });
});)

# Update scenes file to contain path to new component
scenes_file_path = "./src/core/scenes.js"
file = File.open(scenes_file_path, "rb")
scenes = file.read
file.close

scenes_array = scenes.split("\n")
scene_close_index = scenes_array.index{ |s| s.include?("</Scene>") }
last_import_index = scenes_array.each_index.select{ |i| scenes_array[i].include?('import') }.last
new_import = "import #{bundle} from '../bundles/#{bundle}';"
new_scene = "    <Scene key=\"#{bundle.downcase}\" component={ #{bundle} } title=\"#{bundle}\" />"

scenes_array.insert(last_import_index + 1, new_import)
scenes_array.insert(scene_close_index + 1, new_scene)
new_scenes_file = scenes_array.join("\n")

`rm #{scenes_file_path}`
`touch #{scenes_file_path}`
File.open(scenes_file_path, 'w') { |file| file.write(new_scenes_file + "\n") }

# package = '{\n\t\"name\": \"@'
# package += "#{bundle}"
# package += '\"\n}'

`echo "#{index}" > #{base}/index.js`
`echo "#{spec}" > #{base}/__specs__/index.spec.js`
# # `echo "#{package}" > #{base}/package.json`