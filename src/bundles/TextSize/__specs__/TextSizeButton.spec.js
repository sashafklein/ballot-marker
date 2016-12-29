/* eslint no-undef:0 */

import { spy } from 'sinon';
import Button from '../../../shared/components/Button';
import { TextSizeButton } from '../TextSizeButton';

describe('<TextSizeButton />', () => {
  it('dispatches textSize correctly', () => {
    const dispatch = spy();

    const comp = mockComp(TextSizeButton, { textSize: 'small', size: 'medium', dispatch });
    const button = comp.find(Button);
    expect(button.props().children).to.eq('Medium');
    button.simulate('press');

    expect(dispatch.lastCall.args[0]).to.eql({
      type: 'CHANGE_SETTING',
      setting: 'textSize',
      value: 'medium'
    });
  });
});
