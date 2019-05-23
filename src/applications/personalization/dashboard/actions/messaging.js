import { apiRequest } from 'platform/utilities/api';
import { createUrlWithQuery } from '../utils/helpers';

import {
  FETCH_FOLDER_FAILURE,
  FETCH_FOLDER_SUCCESS,
  LOADING_FOLDER,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_FAILURE,
  LOADING_RECIPIENTS,
} from '../utils/constants';

const BASE_URL = `/messaging/health`;

export function fetchFolder(id, query = {}) {
  return dispatch => {
    const errorHandler = () => dispatch({ type: FETCH_FOLDER_FAILURE });

    dispatch({
      type: LOADING_FOLDER,
      request: { id, query },
    });

    if (id !== null) {
      const folderUrl = `/folders/${id}`;
      const messagesUrl = createUrlWithQuery(`${folderUrl}/messages`, query);

      Promise.all(
        [folderUrl, messagesUrl].map(url =>
          apiRequest(
            `${BASE_URL}${url}`,
            null,
            response => response,
            errorHandler,
          ),
        ),
      )
        .then(([folder, messages]) =>
          dispatch({
            type: FETCH_FOLDER_SUCCESS,
            folder,
            messages,
          }),
        )
        .catch(errorHandler);
    } else {
      errorHandler();
    }
  };
}

export function fetchRecipients() {
  const url = '/recipients';
  return dispatch => {
    dispatch({ type: LOADING_RECIPIENTS });

    apiRequest(
      `${BASE_URL}${url}`,
      null,
      ({ payload }) => dispatch({ type: FETCH_RECIPIENTS_SUCCESS, payload }),
      () => dispatch({ type: FETCH_RECIPIENTS_FAILURE }),
    );
  };
}
