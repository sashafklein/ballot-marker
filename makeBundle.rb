bundle = ARGV[0]

raise "No bundle name provided!" unless bundle && bundle.length > 0

base = "src/bundles/#{bundle}"

`mkdir #{base}`
`mkdir #{base}/__specs__`
`touch #{base}/index.js`
`touch #{base}/__specs__/index.spec.js`
`touch #{base}/package.json`

index = %Q(import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View } from 'react-native';

// Export an unconnected version for testing
export const #{bundle} = () => (
  <View />
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

package = '{\n\t\"name\": \"@'
package += "#{bundle}"
package += '\"\n}'

`echo "#{index}" > #{base}/index.js`
`echo "#{spec}" > #{base}/__specs__/index.spec.js`
`echo "#{package}" > #{base}/package.json`