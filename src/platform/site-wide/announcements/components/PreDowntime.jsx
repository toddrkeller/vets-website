// Dependencies.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { differenceInMinutes } from 'date-fns';
import PromoBanner, {
  PROMO_BANNER_TYPES,
} from '@department-of-veterans-affairs/formation-react/PromoBanner';

class PreDowntime extends Component {
  static propTypes = {
    announcement: PropTypes.shape({
      downtimeStartsAt: PropTypes.string.isRequired,
    }).isRequired,
    dismiss: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Derive minutes remaining.
    const now = Date.now();
    const minutesRemaining = differenceInMinutes(
      props?.announcement?.downtimeStartsAt,
      now,
    );

    this.state = {
      minutesRemaining,
    };
  }

  componentWillMount() {
    // Set an interval to update the time.
    this.rerenderInterval = setInterval(
      () => this.updateMinutesRemaining(),
      60000,
    );
  }

  componentWillUnmount() {
    // Prevent memory leaks by clearing timeouts.
    clearInterval(this.rerenderInterval);
  }

  updateMinutesRemaining = () => {
    const {
      announcement: { downtimeStartsAt },
    } = this.props;

    // Derive minutes remaining.
    const now = Date.now();
    const minutesRemaining = differenceInMinutes(downtimeStartsAt, now);

    // Update minutes remaining in state.
    this.setState({ minutesRemaining });
  };

  render() {
    const { minutesRemaining } = this.state;
    const { dismiss } = this.props;

    // Derive the message.
    const message = `Scheduled maintenance starts in ${minutesRemaining} minutes. If you’re filling out a form, sign in or create an account to save your work.`;

    return (
      <PromoBanner
        onClose={dismiss}
        render={() => <div>{message}</div>}
        type={PROMO_BANNER_TYPES.announcement}
      />
    );
  }
}

export default PreDowntime;
