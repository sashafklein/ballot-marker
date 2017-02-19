/* eslint no-undef:0, no-unused-expressions:0 */
import { Map, List } from 'immutable';
import { ListView } from 'react-native';

import { Voter } from '../';
import PageWithActions from '../../../shared/components/PageWithActions';

describe('<Voter />', () => {
  it('renders a PageWithActions with settings links', () => {
    const comp = mockComp(Voter, {
      contest: Map({
        id: 'one',
        name: 'whatever',
        options: List([
          Map({ name: 'First Last' })
        ])
      }),
      selections: List([])
    });
    const page = comp.find(PageWithActions).get(0);
    expect(page).to.exist;

    const list = comp.find(ListView).get(0);
    expect(list).to.exist;
  });
});
