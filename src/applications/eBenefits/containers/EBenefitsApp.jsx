import React from 'react';
import { connect } from 'react-redux';

import backendServices from 'platform/user/profile/constants/backendServices';
import { fetchPersonalInformation } from '../actions';

import RequiredLoginView from 'platform/user/authorization/components/RequiredLoginView';
import RatedDisabilitiesView from '../components/RatedDisabilities';

class EBenefitsApp extends React.Component {
  render() {
    return (
      <div>
        <RequiredLoginView
          authRequired={1}
          serviceRequired={backendServices.USER_PROFILE}
          user={this.props.user}
          loginUrl={this.props.loginUrl}
          verifyUrl={this.props.verifyUrl}
        >
          <RatedDisabilitiesView user={this.props.user} />
        </RequiredLoginView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  fetchPersonalInformation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EBenefitsApp);

export { EBenefitsApp };
