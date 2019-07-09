import { apiRequest } from '../../../../platform/utilities/api';
import React from 'react';
import { requireDisability, validateDisabilityName } from '../validations';

class ClassificationField extends React.Component {
  render() {
    if (!this.props.formData) return null;

    return (
      <div className="add-new-disability-container va-flex">
        <div className="flex-auto classification-text">
          <p>{this.props.formData}</p>
        </div>
        <div className="flex-none right">
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
    this.setState(
      {
        condition: value,
      },
      () => this.props.onChange(value),
    );
  }

  render() {
    // For accessing touch state from parent component
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
      Based on your description, we use data from previous claims to assign a
      disability to your claim.
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
