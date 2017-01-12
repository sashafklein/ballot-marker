/* eslint no-undef:0 */

import { getTitle } from '../election';

describe('getTitle', () => {
  it('returns "General Election" when given "general" as type', () => {
    expect(getTitle('general')).to.equal('General Election');
  });

  it('returns "Election" as a default', () => {
    expect(getTitle('whatever')).to.equal('Election');
  });
});
