import { apiRequest } from '../../../../platform/utilities/api';
import React from 'react';
import { requireDisability, validateDisabilityName } from '../validations';

class ClassificationField extends React.Component {
  render() {
    if (!this.props.formData) return null;

    return (
      <div>
        <strong>Disability we assigned</strong>
        <div>
          <p>{this.props.formData}</p>
          <button
            className="va-button-link"
            onClick={() => this.props.onChange(null)}
          >
            <i className="fa fa-trash" /> <span>Remove this</span>
          </button>
        </div>
      </div>
    );
  }
}

class CustomField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: this.props.formData || '',
    };
  }

  onChange(value) {
    const cleanInput = this.cleanUpInput(value);
    this.setState(
      {
        condition: cleanInput,
      },
      () => this.props.onChange(cleanInput),
    );
  }

  cleanUpInput(inputValue) {
    const inputTransformers = [
      // Replace a bunch of things that aren't valid with valid equivalents
      input => input.replace(/["”’]/g, `'`),
      input => input.replace(/[;–]/g, ' -- '),
      input => input.replace(/[&]/g, ' and '),
      input => input.replace(/[\\]/g, '/'),
      // TODO: Remove the period replacer once permanent fix in place
      input => input.replace(/[.]/g, ' '),
      // Strip out everything that's not valid and doesn't need to be replaced
      // TODO: Add period back into allowed chars regex
      input => input.replace(/([^a-zA-Z0-9\-',/() ]+)/g, ''),
      // Get rid of extra whitespace characters
      input => input.trim(),
      input => input.replace(/\s{2,}/g, ' '),
    ];

    return inputTransformers.reduce(
      (userInput, transformer) => transformer(userInput),
      inputValue,
    );
  }

  render() {
    // const { formContext, idSchema } = this.props;
    // if (formContext.touched[idSchema.$id.replace(/_condition$/, '')]) {
    //   return this.renderClassifiedView();
    // }
    return (
      <div>
        <strong>Your description</strong>
        <input
          type="text"
          value={this.state.condition}
          onChange={event => this.onChange(event.target.value)}
        />
      </div>
    );
  }
}

const titleComponent = (
  <div>
    <p>
      Based on your description, we use data from previous claims to disability
      to your claim.
    </p>
    <p>
      If the disability we assign you is wrong, you can choose to use your
      disability description instead of the assigned disability.
    </p>
  </div>
);

export const uiSchema = {
  condition: {
    'ui:title': titleComponent,
    'ui:field': CustomField,
    'ui:validations': [requireDisability, validateDisabilityName],
  },
  classification: {
    'ui:title': ' ',
    'ui:field': ClassificationField,
  },
};

export const schema = {
  type: 'object',
  properties: {},
};

export const getClassification = claimText =>
  apiRequest(
    'http://198.199.119.238:8000/api/v1.0/classification',
    // eslint-disable-next-line camelcase
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line camelcase
      body: JSON.stringify({ claim_text: claimText }),
    },
    response => {
      // eslint-disable-next-line no-console
      console.log('got response ', response.prediction);
      return response.prediction.classification;
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('classification failure for ', claimText);
      return Promise.reject();
    },
  );
