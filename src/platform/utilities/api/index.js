import Raven from 'raven-js';
import appendQuery from 'append-query';

import environment from '../environment';
import localStorage from '../storage/localStorage';

const BASE_URL = `${environment.API_URL}/v0`;

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

const parsePayload = async response => {
  if (isJson(response)) response.payload = await response.json();
  return response;
};

const validateStatus = (response, redirect = true) => {
  // Cached responses, as is the case for the user profile, will return 304.
  if (response.ok || response.status === 304) return response;

  // TODO: Remove this block when the session timeout feature launches.
  // This legacy code redirected to a prompt to login upon receiving an
  // unauthorized response, but the timeout modal will supersede this behavior;
  // It will redirect to a session expired page when a session expires.
  // Any unauthorized requests for user will just trigger a re-render
  // to display the current session as signed out, so it does not redirect.
  if (environment.isProduction() && redirect) {
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

const updateSessionExpiration = response => {
  const sessionExpiration = response.headers.get('X-Session-Expiration');
  if (sessionExpiration)
    localStorage.setItem('sessionExpiration', sessionExpiration);
  return response;
};

const logError = error => {
  if (error instanceof Error) {
    const message = `API Request Error: ${error.message}`;
    Raven.captureMessage(message, { extra: { error } });
  }

  throw error;
};

/**
 * Makes a request to the API and handles the response.
 *
 * @param {string} resource - The URL to fetch. If it starts with a leading "/"
 *   it will be appended to the BASE_URL. Otherwise it will be used as an
 *   absolute URL.
 * @param {Object} [{}] customSettings - Custom settings you want to apply to
 *   the fetch request. Will be mixed with, and potentially override, the
 *   DEFAULT_FETCH_SETTINGS.
 * @param {Function} onSuccess - Callback to execute if the fetch request
 *   resolves with a success response.
 * @param {Function} onError - Callback to execute if the fetch request resolves
 *   with an error response. The argument could be an Error or Response object,
 *   so it should not always expect a Response with an attached payload and
 *   should safely verify that the payload exists.
 * @returns {Promise} A Promise that is resolved or rejected with the response
 *   if neither callback is invoked. If a callback is invoked, the Promise is
 *   resolved or rejected with that callback's return value.
 */
export function apiRequest(
  resource,
  customSettings = {},
  onSuccess,
  onError,
  redirectToLogin = true,
) {
  const url = resource[0] === '/' ? [BASE_URL, resource].join('') : resource;

  const settings = {
    ...DEFAULT_FETCH_SETTINGS,
    ...customSettings,
    headers: {
      ...DEFAULT_FETCH_SETTINGS.headers,
      ...customSettings.headers,
    },
  };

  // The error callback should still be invoked if there's a general exception.
  const handleError = error => {
    if (onError) onError(error);
    if (error instanceof Error) throw error;
  };

  return fetch(url, settings)
    .then(updateSessionExpiration)
    .then(parsePayload)
    .then(response => validateStatus(response, redirectToLogin))
    .then(onSuccess)
    .catch(handleError)
    .catch(logError);
}

/**
 * Temporary function to be used for transitioning from fetch to apiRequest.
 *
 * The only difference from apiRequest is that this does not do any redirects
 * when validating status.
 *
 * TODO: When the session timeout modal releases to production:
 * 1. Delete this function.
 * 2. Remove the redirect logic from validateStatus.
 * 3. Remove the redirect flag from apiRequest and validateStatus.
 * 4. Replace any use of apiFetch with apiRequest.
 */
export function apiFetch(resource, customSettings = {}, onSuccess, onError) {
  return apiRequest(resource, customSettings, onSuccess, onError, false);
}
