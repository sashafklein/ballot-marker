/* eslint no-undef:0 */

import { spy } from 'sinon';
import Button from '../../../shared/components/Button';
import { Headset } from '../index.js';

describe('<Headset />', () => {
  it('handles screenOff correctly', () => {
    const dispatch = spy();

    const screenOn = mockComp(Headset, { screenOff: false, dispatch });
    const button = screenOn.find(Button);
    expect(button.props().children).to.eq('Turn the screen off');

    button.simulate('press');
    expect(dispatch.lastCall.args[0]).to.eql({
      type: 'CHANGE_SETTING',
      setting: 'screenOff',
      value: true
    });

    const screenOff = mockComp(Headset, { screenOff: true, dispatch });
    const button2 = screenOff.find(Button);
    expect(button2.props().children).to.eq('Turn the screen on');

    button2.simulate('press');
    expect(dispatch.lastCall.args[0]).to.eql({
      type: 'CHANGE_SETTING',
      setting: 'screenOff',
      value: false
    });
  });
});
