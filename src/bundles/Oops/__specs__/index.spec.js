import React from 'react';
import { Text } from 'react-native';
import { spy } from 'sinon';
import { Oops } from '../';

describe('<Oops />', () => {
  it('handles string and element message arrays', () => {
    const stringComp = mockComp(Oops, { messages: ['Hey there!'], dispatch: spy() });
    expect(stringComp.find(Text).get(0).props.children).to.eq('Hey there!');
    expect(stringComp.find(Text).length).to.eq(1);

    const arrayComp = mockComp(Oops, { messages: [<Text>Hey there!</Text>], dispatch: spy() });
    expect(stringComp.find(Text).get(0).props.children).to.eq('Hey there!');
    expect(arrayComp.find(Text).length).to.eq(1);
  });
});
