/* @flow */

import type { Instructions } from './types';

type Action = {
  type: string,
};

const FAKE_ACTION = 'FAKE_ACTION';

export default function counter(state: Instructions = 0, action: Action): Instructions {
  switch (action.type) {
    case FAKE_ACTION:
      return state + 1;
    default:
      return state;
  }
}

export const increment = (): Action => ({
  type: FAKE_ACTION,
});
