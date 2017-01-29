/* eslint no-undef:0 */

import { Voter } from '../';
import PageWithActions from '../../../shared/components/PageWithActions';

describe('<Voter />', () => {
  it('renders a PageWithActions with settings links', () => {
    const comp = mockComp(Voter, { election: 0 });
    const page = comp.find(PageWithActions).first();
    expect(page.exists()).to.eq(true)
  });
});
