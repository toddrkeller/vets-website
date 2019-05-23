import Raven from 'raven-js';

import recordEvent from 'platform/monitoring/record-event';
import { apiRequest } from 'platform/utilities/api';
import get from 'platform/utilities/data/get';

import {
  BACKEND_AUTHENTICATION_ERROR,
  BACKEND_SERVICE_ERROR,
  GET_ENROLLMENT_DATA_FAILURE,
  GET_ENROLLMENT_DATA_SUCCESS,
  NO_CHAPTER33_RECORD_AVAILABLE,
  SERVICE_AVAILABILITY_STATES,
  SET_SERVICE_AVAILABILITY,
  SET_SERVICE_UPTIME_REMAINING,
} from '../utils/constants';

export function getEnrollmentData() {
  return dispatch =>
    apiRequest(
      '/post911_gi_bill_status',
      null,
      ({ payload }) => {
        recordEvent({ event: 'post911-status-success' });
        return dispatch({
          type: GET_ENROLLMENT_DATA_SUCCESS,
          data: payload.data.attributes,
        });
      },
      responseOrError => {
        recordEvent({ event: 'post911-status-failure' });
        const error = get('payload.errors[0]', responseOrError);
        if (error) {
          if (error.status === '503' || error.status === '504') {
            // Either EVSS or a partner service is down or EVSS times out
            return dispatch({ type: BACKEND_SERVICE_ERROR });
          }
          if (error.status === '403') {
            // Backend authentication problem
            return dispatch({ type: BACKEND_AUTHENTICATION_ERROR });
          }
          if (error.status === '404') {
            // EVSS partner service has no record of this user
            return dispatch({ type: NO_CHAPTER33_RECORD_AVAILABLE });
          }
          return Promise.reject(
            new Error(
              `post-911-gib-status getEnrollmentData() received unexpected error: ${
                error.status
              }: ${error.title}: ${error.detail}`,
            ),
          );
        }
        return Promise.reject(
          new Error(
            'post-911-gib-status getEnrollmentData() received unexpected error (no status code available)',
          ),
        );
      },
    ).catch(error => {
      Raven.captureException(error);
      return dispatch({ type: GET_ENROLLMENT_DATA_FAILURE });
    });
}

export function getServiceAvailability() {
  return dispatch => {
    dispatch({
      type: SET_SERVICE_AVAILABILITY,
      serviceAvailability: SERVICE_AVAILABILITY_STATES.pending,
    });

    return apiRequest(
      '/backend_statuses/gibs',
      null,
      ({ payload }) => {
        const availability = payload.data.attributes.isAvailable;
        const uptimeRemaining = payload.data.attributes.uptimeRemaining || null;

        dispatch({
          type: SET_SERVICE_AVAILABILITY,
          serviceAvailability: availability
            ? SERVICE_AVAILABILITY_STATES.up
            : SERVICE_AVAILABILITY_STATES.down,
        });

        dispatch({
          type: SET_SERVICE_UPTIME_REMAINING,
          uptimeRemaining,
        });
      },
      () => {
        dispatch({
          type: SET_SERVICE_AVAILABILITY,
          serviceAvailability: SERVICE_AVAILABILITY_STATES.down,
        });
      },
    );
  };
}
