import { apiRequest } from 'platform/utilities/api';

export function loadPrescriptions(options) {
  let url = '/';
  let defaultSort = '-refill_submit_date';
  const queries = [];

  // Construct segments of the final URL based on options passed in.
  if (options) {
    if (options.active) {
      url = '/active';
      defaultSort = 'prescription_name';
    }

    if (options.page) {
      queries.push(`page=${options.page}`);
    }
  }

  queries.push(`sort=${options.sort || defaultSort}`);

  // Append query parameters.
  if (queries.length > 0) {
    const queryString = queries.join('&');
    url = `${url}?${queryString}`;
  }

  return dispatch => {
    dispatch({
      type: options.active ? 'LOADING_ACTIVE' : 'LOADING_HISTORY',
    });

    apiRequest(
      `/prescriptions${url}`,
      null,
      ({ payload }) =>
        dispatch({
          type: 'LOAD_PRESCRIPTIONS_SUCCESS',
          active: options.active,
          payload,
        }),
      ({ payload }) =>
        dispatch({
          type: 'LOAD_PRESCRIPTIONS_FAILURE',
          active: options.active,
          payload,
        }),
    );
  };
}
