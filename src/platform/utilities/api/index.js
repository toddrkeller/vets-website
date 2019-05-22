import Raven from 'raven-js';
import appendQuery from 'append-query';

import environment from '../environment';
import localStorage from '../storage/localStorage';

const DEFAULT_FETCH_SETTINGS = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'X-Key-Inflection': 'camel',
  },
};

const isJson = response => {
  const contentType = response.headers.get('Content-Type');
  return contentType && contentType.includes('application/json');
};

const handleResponse = async response => {
  if (isJson(response)) {
    response.payload = await response.json();
  }

  if (response.ok || response.status === 304) {
    const sessionExpiration = response.headers.get('X-Session-Expiration');
    if (sessionExpiration)
      localStorage.setItem('sessionExpiration', sessionExpiration);
    return response;
  }

  // TODO: Remove this block when the session timeout feature launches.
  // This legacy code redirected to a prompt to login upon receiving an
  // unauthorized response, but the timeout modal will supersede this behavior;
  // It will redirect to a session expired page when a session expires.
  // Any unauthorized requests for user will just trigger a re-render
  // to display the current session as signed out, so it does not redirect.
  if (environment.isProduction()) {
    const { pathname } = window.location;
    const shouldRedirectToLogin =
      response.status === 401 &&
      response.url !== '/user' &&
      !pathname.includes('auth/login/callback');

    if (shouldRedirectToLogin) {
      const loginUrl = appendQuery(environment.BASE_URL, { next: pathname });
      window.location = loginUrl;
    }
  }

  throw response;
};

const logFetchError = async error => {
  Raven.captureMessage(`vets_client_error: ${error.message}`, {
    extra: { error },
  });

  throw error;
};

/**
 * Makes a request to the API and handles the response.
 *
 * @param {string} resource - The URL to fetch. If it starts with a leading "/"
 *   it will be appended to the baseUrl. Otherwise it will be used as an absolute
 *   URL.
 * @param {Object} [{}] customSettings - Custom settings you want to apply to
 *   the fetch request. Will be mixed with, and potentially override, the
 *   DEFAULT_FETCH_SETTINGS.
 * @param {Function} onSuccess - Callback to execute if the fetch request
 *   resolves with a success response.
 * @param {Function} onError - Callback to execute if the fetch request resolves
 *   with an error response.
 * @returns {Promise} A Promise that is resolved or rejected with the response
 *   if neither callback is invoked. If a callback is invoked, the Promise is
 *   resolved or rejected with that callback's return value.
 */
export function apiRequest(resource, customSettings = {}, onSuccess, onError) {
  const baseUrl = `${environment.API_URL}/v0`;
  const url = resource[0] === '/' ? [baseUrl, resource].join('') : resource;

  const settings = {
    ...DEFAULT_FETCH_SETTINGS,
    ...customSettings,
    headers: {
      ...DEFAULT_FETCH_SETTINGS.headers,
      ...customSettings.headers,
    },
  };

  return fetch(url, settings)
    .catch(logFetchError)
    .then(handleResponse)
    .then(onSuccess)
    .catch(onError);
}
