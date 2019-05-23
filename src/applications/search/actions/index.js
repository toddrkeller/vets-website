export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE';

import { apiRequest } from 'platform/utilities/api';

export function fetchSearchResults(query, page) {
  return dispatch => {
    dispatch({ type: FETCH_SEARCH_RESULTS, query });

    const settings = {
      method: 'GET',
    };

    let queryString = `/search?query=${encodeURIComponent(query)}`;

    if (page) {
      queryString = queryString.concat(`&page=${page}`);
    }

    apiRequest(
      queryString,
      settings,
      ({ payload }) =>
        dispatch({
          type: FETCH_SEARCH_RESULTS_SUCCESS,
          results: payload.data.attributes.body,
          meta: payload.meta,
        }),
      () => dispatch({ type: FETCH_SEARCH_RESULTS_FAILURE }),
    );
  };
}
