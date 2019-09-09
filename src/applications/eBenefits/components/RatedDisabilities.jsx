import React from 'react';
import PropTypes from 'prop-types';

class RatedDisabilitiesVew extends React.Component {
  static propTypes = {
    fetchPersonalInformation: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return <h1>Gated Disabilities Content</h1>;
  }
}

export default RatedDisabilitiesVew;
