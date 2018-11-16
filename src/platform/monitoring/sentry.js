/**
 * Initializes error reporting to Sentry when running at a higher enviroment than localhost
 */

import * as Sentry from '@sentry/browser';
import environment from '../utilities/environment';

// url check is necessary for e2e tests and local environments
const trackErrors = environment.BASE_URL.indexOf('localhost') < 0;

if (trackErrors) {
  const url = `${environment.BASE_URL}/js-report/0`.replace('//', '//faker@');

  Sentry.init({ dsn: url });

  // this is for errors that happen in promises
  // it does not work locally with the webpack devtool setting we
  // use but does with the one we use in prod/staging
  window.addEventListener('unhandledrejection', evt => {
    const options = {
      extra: {
        evt,
      },
    };

    if (evt && evt.reason) {
      Sentry.captureException(evt.reason, options);
    } else {
      Sentry.captureMessage('Unhandled promise rejection', options);
    }
  });
}
