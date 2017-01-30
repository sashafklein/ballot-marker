/* eslint no-undef:0 */

import { Settings } from '../';
import TextSizeButton from '../TextSizeButton';

describe('<Settings />', () => {
  it('renders three TextSizeButtons', () => {
    const comp = mockComp(Settings);
    const buttons = comp.find(TextSizeButton);
    expect(buttons.length).to.eq(3);
    expect(buttons.map(b => b.props().size)).to.eql(['small', 'medium', 'large']);
  });
});
