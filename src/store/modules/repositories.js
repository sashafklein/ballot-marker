import * as Immutable from 'immutable';
import WebAPI from '@api';

export const REPOSITORIES_FETCH_REQUESTED = 'REPOSITORIES_FETCH_REQUESTED';
export const REPOSITORIES_FETCH_SUCCEEDED = 'REPOSITORIES_FETCH_SUCCEEDED';
export const REPOSITORIES_FETCH_FAILED = 'REPOSITORIES_FETCH_FAILED';

export default function repositories(state = Immutable.fromJS({}), action) {
  switch (action.type) {
    default:
      return 2;
  }
}

export const fetchRepositories = () => ({
  types: [REPOSITORIES_FETCH_REQUESTED, REPOSITORIES_FETCH_SUCCEEDED, REPOSITORIES_FETCH_FAILED],
  promise: WebAPI.fetchRepositories(),
});
