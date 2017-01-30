/* eslint no-undef:0 */

import { spy } from 'sinon';

import { ElectionDetails } from '../';
import PageWithActions from '../../../shared/components/PageWithActions';

describe('<ElectionDetails />', () => {
  it('renders a PageWithActions', () => {
    const comp = mockComp(ElectionDetails, { contests: [] });
    expect(comp.find(PageWithActions).length).to.eq(1);
  });
});
