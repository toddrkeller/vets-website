import React from 'react';

import { apiRequest } from '../../../../platform/utilities/api';
import DisabilityRatingCalculator from '../../disability-rating-calculator/components/DisabilityRatingCalculator';

export default class RatedDisabilities extends React.Component {
  constructor() {
    super();

    this.state = {
      disabilities: [],
    };
  }

  componentDidMount() {
    this.fetchDisabilities();
  }

  handleSuccess = payload => {
    if (payload?.data?.attributes?.ratedDisabilities) {
      this.setState({
        disabilities: payload.data.attributes.ratedDisabilities,
      });
    }
  };

  handleError = payload => {
    console.error(payload);
  };

  fetchDisabilities = () => {
    apiRequest(
      '/disability_compensation_form/rated_disabilities',
      null,
      this.handleSuccess,
      this.handleError,
    );
  };

  render() {
    return (
      <div>
        <h1>rated disabilities table</h1>
        {this.state.disabilities.map((d, index) => (
          <p key={index}>{d.name}</p>
        ))}
      </div>
    );
  }
}
