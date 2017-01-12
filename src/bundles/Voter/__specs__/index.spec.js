/* eslint no-undef:0 */

import { Voter } from '../';
import PageComponent from '../../../shared/components/PageWithActions';

describe('<Voter />', () => {
  it('renders a PageComponent with settings links', () => {
    const comp = mockComp(Voter, { election: 0 });
    const page = comp.find(PageComponent).first();
    expect(page.props().topButtons).to.eql({});
  });
});
