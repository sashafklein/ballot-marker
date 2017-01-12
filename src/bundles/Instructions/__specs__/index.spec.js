/* eslint no-undef:0 */

import { Instructions } from '../';
import TextManifest from '../../../shared/components/TextManifest';

describe('<Instructions />', () => {
  it('renders test', () => {
    const comp = mockComp(Instructions);
    expect(comp.find(TextManifest).length).to.eq(1);
  });
});
