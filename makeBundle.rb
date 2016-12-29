bundle = ARGV[0]

raise "No bundle name provided!" unless bundle && bundle.length > 0

def camelize(string)
  string[0].downcase + string[1..string.length]
end

scenes_file_path = "./src/core/scenes.js"
file = File.open(scenes_file_path, "rb")
scenes = file.read
file.close

scenes_array = scenes.split("\n")
scene_close_index = scenes_array.index{ |s| s.include?("</Scene>") }
last_import_index = scenes_array.each_index.select{ |i| scenes_array[i].include?('import') }.last
last_import = scenes_array[last_import_index].split('import ')[1].split(' ')[0]
new_import = "import #{bundle} from '../bundles/#{bundle}';"
new_scene = "    <Scene key=\"#{camelize(bundle)}\" component={ #{bundle} } title=\"#{bundle}\" />"

scenes_array.insert(last_import_index + 1, new_import)
scenes_array.insert(scene_close_index + 1, new_scene)
new_scenes_file = scenes_array.join("\n")

base = "src/bundles/#{bundle}"

`mkdir #{base}`
`mkdir #{base}/__specs__`
`touch #{base}/index.js`
`touch #{base}/__specs__/index.spec.js`
# `touch #{base}/package.json`

spec = %Q(/* eslint no-undef:0 */

import { spy } from 'sinon';

import { #{bundle} } from '../';

describe('<#{bundle} />', () => {
  it('has a test', () => {
    expect(true).to.eq(false);
  });
});)

# Update scenes file to contain path to new component

`rm #{scenes_file_path}`
`touch #{scenes_file_path}`

index = %Q(import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import PageWithActions from '../../shared/components/PageWithActions';
import gbs from '../../shared/styles';

// Export an unconnected version for testing
export const #{bundle} = () => (
  <PageWithActions onBack={ Actions.pop }>
    <View style={ gbs.l.centeredContainer }>
    </View>
  </PageWithActions>
);

const { func } = React.PropTypes;
#{bundle}.propTypes = {
  dispatch: func
};

const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps))(#{bundle});
)

File.open(scenes_file_path, 'w') { |file| file.write(new_scenes_file + "\n") }

# package = '{\n\t\"name\": \"@'
# package += "#{bundle}"
# package += '\"\n}'

File.open("#{base}/index.js", 'w') { |file| file.write(index + "\n") }
File.open("#{base}/__specs__/index.spec.js", 'w') { |file| file.write(spec + "\n") }
# # `echo "#{package}" > #{base}/package.json`