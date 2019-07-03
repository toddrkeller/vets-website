// import _ from 'lodash/fp'; // eslint-disable-line no-restricted-imports

// import AutosuggestField from './AutoClassificationField';

// // don't use for enum fields, they need access to the
// // list of enums and names
// export const schema = {
//   type: 'object',
//   properties: {
//     id: {
//       type: 'any',
//     },
//     label: {
//       type: 'string',
//     },
//   },
// };

// /*
//  * Create uiSchema for autosuggest
//  *
//  * @param {string} label - Label for the field
//  * @param {function} getOptions - Function that fetchs options to be shown and returns a promise
//  * @param {object} options - Any other options to override the uiSchema defaults with
//  */
// export function uiSchema(label, getOptions, options = {}) {
//   return _.merge(
//     {
//       'ui:title': label,
//       'ui:field': AutosuggestField,
//       'ui:errorMessages': {
//         type: 'Please select an option from the suggestions',
//       },
//       'ui:options': {
//         showFieldLabel: 'label',
//         maxOptions: 20,
//         getOptions,
//       },
//     },
//     options,
//   );
// }

import { apiRequest } from '../../../../platform/utilities/api';

import React from 'react';

import LoadingIndicator from '@department-of-veterans-affairs/formation-react/LoadingIndicator';
import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { PENDING, RESOLVED, REJECTED } from '../../526EZ/constants';

/**
 * Handles the various display statuses when calling an asynchronous function.
 */
class AsyncDisplayWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      promiseState: RESOLVED,
    };

    // Make sure we configured it correctly
    // StringField passes 'ui:options' as the options prop
    const uiOptions = props.options;
    if (!uiOptions) {
      throw new Error('No ui:options supplied to AsyncDisplayWidget.');
    }

    if (typeof uiOptions.viewComponent !== 'function') {
      throw new Error(
        'AsyncDisplayWidget requires viewComponent in ui:options to be a React component.',
      );
    }

    if (
      uiOptions.failureComponent &&
      typeof uiOptions.failureComponent !== 'function'
    ) {
      throw new Error(
        'AsyncDisplayWidget requires the optional failureComponent in ui:options to be a React component.',
      );
    }

    if (typeof uiOptions.callback !== 'function') {
      throw new Error(
        'AsyncDisplayWidget requires callback in ui:options to be a function.',
      );
    }
  }

  componentDidMount() {
    // // TODO: Don't call the callback _every_ time the component is mounted
    // const cbPromise = this.props.options.callback();
    // // instanceof Promise doesn't work in Firefox, so we just check for .then() and hope it's a promise
    // if (cbPromise && typeof cbPromise.then === 'function') {
    //   cbPromise
    //     .then(data => {
    //       this.setState({
    //         data,
    //         promiseState: RESOLVED,
    //       });
    //     })
    //     .catch(data => {
    //       if (data instanceof Error) {
    //         throw data;
    //       }
    //       this.setState({
    //         data,
    //         promiseState: REJECTED,
    //       });
    //     });
    // } else {
    //   throw new Error(
    //     `AsyncDisplayWidget: Expected callback to return a Promise, but got ${typeof cbPromise}.`,
    //   );
    // }
  }

  // Not sure if this will be useful yet
  componentDidUnmount() {
    // Cancel the promise if it isn't already fulfilled
  }

  render() {
    const uiOptions = this.props.options;

    // Depending on the state of the promise, we'll render different things
    let content;
    switch (this.state.promiseState) {
      case RESOLVED: {
        content = <input type="text" />;
        break;
      }
      case REJECTED: {
        // Show error message or error component passed in
        const CustomAlert = uiOptions.failureComponent;
        const { errorHeadline, errorContent } = uiOptions;
        // TODO: Get generic headline and content
        content = CustomAlert ? (
          <CustomAlert />
        ) : (
          <AlertBox
            status="error"
            isVisible
            headline={errorHeadline || 'We can’t find your information'}
            content={
              errorContent ||
              'We’re sorry. We can’t find your information in our system right now. Please try again later.'
            }
            className="async-display-widget-alert-box"
          />
        );
        break;
      }
      case PENDING:
      default: {
        // Show loading spinner or pending component passed in
        content = (
          <LoadingIndicator
            message={
              uiOptions.loadingMessage ||
              'Please wait while we load your information.'
            }
          />
        );
        break;
      }
    }

    return content;
  }
}

const getClassification = claimText =>
  apiRequest(
    'http://198.199.119.238:8000/api/v1.0/classification',
    // eslint-disable-next-line camelcase
    { claim_text: claimText },
    response => {
      // eslint-disable-next-line no-console
      console.log('got response ', response.data.prediction);
      return response.data.prediction;
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('classification failure for ', claimText);
      return Promise.reject();
    },
  );

const titleComponent = (
  <div>
    <h4>New disability</h4>
    <p>
      Based on your description, we use data from previous claims to assign a
      disability to your claim.
    </p>
    <p>
      If the disability we asign you is wrong, you can choose to use your
      disability description instead of the assigned disability.
    </p>
    <strong>Your description</strong>
  </div>
);

export const uiSchema = {
  'ui:title': titleComponent,
  'ui:field': 'StringField',
};

export const schema = {
  type: 'object',
  properties: {},
};
