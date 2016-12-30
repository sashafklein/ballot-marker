/* eslint no-undef:0 */

import { styleCombiner, transformFontSizes } from '../styles';
import gbs from '../../styles';

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

describe('transformFontSizes', () => {
  const original = gbs.t;
  const small = transformFontSizes(gbs.t, 'small');
  const medium = transformFontSizes(gbs.t, 'medium');
  const large = transformFontSizes(gbs.t, 'large');

  const sizes = styleObj => Object.keys(styleObj).map(k => styleObj[k].fontSize).filter(s => s);

  const assertMultiple = (array1, array2, multiple) => {
    array1.forEach((el, i) => {
      expect(array2[i]).to.eq(el * multiple);
    });
  };

  expect(sizes(original).length).not.to.eq(0);
  assertMultiple(sizes(original), sizes(small), 1);
  assertMultiple(sizes(original), sizes(medium), 1.2);
  assertMultiple(sizes(original), sizes(large), 1.4);
});
