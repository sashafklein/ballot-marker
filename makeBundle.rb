bundle = ARGV[0]

raise "No bundle name provided!" unless bundle && bundle.length > 0

base = 'src/bundles/#{bundle}'

`mkdir #{base}`
`mkdir #{base}/__specs__`
`touch #{base}/index.js`
`touch #{base}/__specs__/index.spec.js`
`touch #{base}/package.json`

index = %Q(import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  data: state.data,
})

// Export an unconnected version for testing
export const #{bundle} = (props) => {
  return (

  );
};

const { func } = React.PropTypes;
#{bundle}.propTypes = {
  dispatch: func
};

export default => compose(
  connect(mapStateToProps)
)(#{package});

)

spec = %Q(/* eslint no-undef:0 */

import #{package} from '@#{package}';

describe('<#{package} />', () => {
  it('has a test', () => {
    expect(true).to.eq(false);
  });
});

)

package = %Q({
  \"name\": \"@#{bundle}\"
})

`echo "#{index}" > #{base}/index.js`
`echo "#{spec}" > #{base}/__specs__/index.spec.js`
`echo "#{package}" > #{base}/package.json`