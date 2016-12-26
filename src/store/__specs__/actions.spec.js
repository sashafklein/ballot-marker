/* eslint no-undef:0 */

import _ from 'lodash';

import parseFunc from '../../shared/utils/parseFunction';
import * as actions from '../actions';

const recursivelyTestFunctions = (object, ifFunctionCallback) => {
  _.keys(object).forEach(key => {
    if (object[key] instanceof Function) {
      ifFunctionCallback(key, object);
    } else {
      recursivelyTestFunctions(object[key], ifFunctionCallback);
    }
  });
};

describe('Redux actions', () => {
  it('have appropriate types', () => {
    const assertFunctionType = (keyName, actionObject) => {
      const typeCased = _.kebabCase(keyName).split('-').map(w => w.toUpperCase()).join('_');
      expect(actionObject[keyName](1, 2).type).to.equal(typeCased);
    };

    recursivelyTestFunctions(actions, assertFunctionType);
  });

  it('construct object predictably from argument(s)', () => {
    const testThatArgsPassedCorrectly = (key, actionObject) => {
      const argNameArray = parseFunc(actionObject[key]).arguments;
      const args = _.map(argNameArray, (arg, index) => `Argument-${index}`);
      const response = actionObject[key](...args);

      // Make sure the args get added to the action object under the appropriate/predictable argKey
      argNameArray.forEach((argumentName, i) => {
        if (argumentName && argumentName.length) {
          if (response[argumentName] === args[i]) {
            // pass
          } else {
            assert.fail(0, 1, `Expected response[${argumentName}] to equal ${args[i]}.\nResponse was:\n  ${JSON.stringify(response)}`);
          }
          expect(response[argumentName]).to.eq(args[i]);
        }
      });
    };

    recursivelyTestFunctions(actions, testThatArgsPassedCorrectly);
  });
});
