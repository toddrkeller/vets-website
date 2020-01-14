import React from 'react';
import { facilityTypes } from '../config';

const FacilityTypeDescription = ({ location }) => {
  const { facilityType } = location.attributes;
  const typeName = facilityTypes[facilityType || location.type];

  return (
    <p>
      <span>{typeName.toUpperCase()}</span>
    </p>
  );
};

export default FacilityTypeDescription;
