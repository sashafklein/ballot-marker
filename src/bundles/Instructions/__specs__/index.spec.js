/* eslint no-undef:0 */

import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import { Instructions } from '../index.js';


const comp = shallow(<Instructions
  type="general"
  fullTitle="December 24, 2016 General Election"
/>);

describe('<Instructions />', () => {
  it('renders appropriate HTML', () => {
    const text = comp.find(Text);

    const title = text.get(1);
    expect(title.props.children).to.eq('General Election');

    const date = text.get(2);
    expect(date.props.children).to.eq('December 24, 2016');
  });
});
