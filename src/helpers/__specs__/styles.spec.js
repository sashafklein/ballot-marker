/* eslint no-undef:0 */

import { styleCombiner } from '../styles';

describe('styleCombiner', () => {
  const defaultStyles = {
    thing: {
      shared: 'default',
      other: 'thing'
    },
    otherThing: {
      shared: 'default2'
    }
  };

  const addStyles = {
    thing: {
      shared: 'add',
      other2: 'add'
    }
  };

  const replaceStyles = {
    thing: {
      shared: 'replace',
      other3: 'replace'
    }
  };

  const styleArray = {
    thing: [
      { shared: 'willBeOverwritten' },
      { other4: 'array', shared: 'array' }
    ]
  };

  it('it replaces with replaceStyles', () => {
    const combiner = styleCombiner(defaultStyles, addStyles, replaceStyles);
    expect(combiner('thing')).to.eql({ shared: 'replace', other3: 'replace' });
  });

  it('it adds on addStyles', () => {
    const combiner = styleCombiner(defaultStyles, addStyles);
    expect(combiner('thing')).to.eql({ shared: 'add', other: 'thing', other2: 'add' });
  });

  it('it only adds relevant keys', () => {
    const combiner = styleCombiner(defaultStyles, addStyles, replaceStyles);
    expect(combiner('otherThing')).to.eql({ shared: 'default2' });
  });

  it('it overwrites with arrays', () => {
    const combiner = styleCombiner(defaultStyles, {}, styleArray);
    expect(combiner('thing')).to.eql({ shared: 'array', other4: 'array' });
  });

  it('it adds with arrays', () => {
    const combiner = styleCombiner(defaultStyles, styleArray);
    expect(combiner('thing')).to.eql({ shared: 'array', other4: 'array', other: 'thing' });
  });

  it('it handles an array default', () => {
    const combiner = styleCombiner(styleArray, addStyles, {});
    expect(combiner('thing')).to.eql({ shared: 'add', other4: 'array', other2: 'add' });
  });
});
