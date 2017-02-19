/* eslint no-undef:0, no-unused-expressions:0 */

import { Map, List } from 'immutable';
import { ListView } from 'react-native';

import { ReviewVotes } from '../';
import PageWithActions from '../../../shared/components/PageWithActions';

describe('<ReviewVotes />', () => {
  it('has a test', () => {
    const comp = mockComp(ReviewVotes, {
      contests: List([
        { id: 'one', name: 'Here is a name' },
        { id: 'two', name: 'Here is another' }
      ]),
      selections: Map({})
    });

    const page = comp.find(PageWithActions).get(0);
    expect(page).to.exist;
    expect(page.props.headerItems.map(i => i.content)).to.eql(['Settings', 'Help']);

    const list = comp.find(ListView).get(0);
    expect(list).to.exist;
  });
});
