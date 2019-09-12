import React from 'react';
import PropTypes from 'prop-types';

class RatedDisabilitiesVew extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return <h1>Rated Disabilities Content Here</h1>;
  }
}

export default RatedDisabilitiesVew;
