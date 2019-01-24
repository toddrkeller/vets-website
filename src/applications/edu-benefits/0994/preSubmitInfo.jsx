import React from 'react';

import preSubmitInfo from '../../../platform/forms/preSubmitInfo';

export default {
  ...preSubmitInfo,
  label: (
    <span>
      The information I have provided is complete and accurate, to the best of
      my knowledge. <br />I have read and accept the{' '}
      <a target="_blank" href="/privacy/">
        privacy policy
      </a>
    </span>
  ),
};
