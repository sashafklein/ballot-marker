/* eslint no-undef:0 */

import { spy } from 'sinon';
import { Text } from 'react-native';
import { Oops } from '../';

describe('<Oops />', () => {
  it('handles array and string messages', () => {
    const stringComp = mockComp(Oops, { messages: 'Hey there!', dispatch: spy() });
    expect(stringComp.find(Text).get(0).props.children).to.eq('Hey there!');
    expect(stringComp.find(Text).length).to.eq(1);

    const arrayComp = mockComp(Oops, { messages: ['Hey', 'there!'], dispatch: spy() });
    expect(arrayComp.find(Text).get(0).props.children).to.eq('Hey');
    expect(arrayComp.find(Text).get(1).props.children).to.eq('there!');
    expect(arrayComp.find(Text).length).to.eq(2);
  });
});
