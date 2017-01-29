/* eslint no-undef:0 */

import { TextSize } from '../';
import TextSizeButton from '../TextSizeButton';

describe('<TextSize />', () => {
  it('renders three TextSizeButtons', () => {
    const comp = mockComp(TextSize);
    const buttons = comp.find(TextSizeButton);
    expect(buttons.length).to.eq(3);
    expect(buttons.map(b => b.props().size)).to.eql(['small', 'medium', 'large']);
  });
});
