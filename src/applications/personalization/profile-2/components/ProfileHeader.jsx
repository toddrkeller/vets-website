import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileHeader extends Component {
  static defaultProps = {
    userFullName: {
      first: '',
      middle: '',
      last: '',
    },
    // defaulting to Army for now as placeholder
    latestBranchOfService: 'A',
  };

  render() {
    const imagePaths = {
      A: '/img/vic-army-symbol.png',
      C: '/img/vic-cg-emblem.png',
      F: '/img/vic-air-force-coat-of-arms.png',
      N: '/img/vic-navy-emblem.png',
      M: '/img/vic-usmc-emblem.png',
      VASeal: '/img/vic-va-seal.png',
    };

    const {
      userFullName: { first, middle, last },
      latestBranchOfService,
    } = this.props;

    return (
      <div className="headerWrapper vads-u-background-color--gray-dark vads-u-color--white vads-u-margin-bottom--2 vads-u-padding-y--3 vads-u-display--flex vads-u-align-items--center vads-u-justify-content--center">
        <div className="headerContentWrapper usa-grid usa-grid-full vads-u-display--flex vads-u-align-items--center">
          <div className="vads-u-padding-x--6 usa-width-one-fourth">
            <img
              className="profileServiceBadge"
              src={imagePaths[`${latestBranchOfService}`]}
              alt="service badge"
            />
          </div>
          <div className="headerNameWrapper vads-u-flex-direction--column">
            <h1 className="profileHeading vads-u-font-family--sans vads-u-font-size--base vads-u-font-weight--normal">
              Your Profile
            </h1>
            <h2 className="vads-u-font-size--h3">
              {first.toLowerCase()} {middle.toLowerCase()} {last.toLowerCase()}
            </h2>
            <h3 className="vads-u-font-family--sans vads-u-font-size--base vads-u-font-weight--normal">
              United States Army Reserve
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userFullName: state.user.profile.userFullName,
});

export default connect(mapStateToProps)(ProfileHeader);
