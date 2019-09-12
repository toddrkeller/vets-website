import React from 'react';
import { connect } from 'react-redux';

import backendServices from 'platform/user/profile/constants/backendServices';
import get from '../../../platform/utilities/data/get';

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
          <RatedDisabilitiesView
            user={this.props.user}
            currentState={this.props.currentState}
          />
        </RequiredLoginView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentState: state,
});

export default connect(mapStateToProps)(EBenefitsApp);

export { EBenefitsApp };
