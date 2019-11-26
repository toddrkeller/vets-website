import React from 'react';
import { connect } from 'react-redux';

class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
  }

  toggleExpanded = e => {
    e.preventDefault();
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const thing = null;
    return (
      <div>
        <span about={thing}>Form goes here</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
});

export default connect(mapStateToProps)(ConfirmationPage);
export { ConfirmationPage };
