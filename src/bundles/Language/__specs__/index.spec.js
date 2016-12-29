/* eslint no-undef:0 */

import { Language } from '../';
import LanguageList from '../LanguageList';

describe('<Language />', () => {
  it('has a LanguageList', () => {
    const comp = mockComp(Language);
    expect(comp.find(LanguageList).length).to.eq(1);
  });
});
