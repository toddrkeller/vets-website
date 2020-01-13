import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { LocationType } from '../../constants';
import LocationAddress from './LocationAddress';
import FacilityTypeDescription from '../FacilityTypeDescription';
import ProviderServiceDescription from '../ProviderServiceDescription';

const LocationInfoBlock = ({ location }) => {
  const { name } = location.attributes;
  const isProvider = location.type === LocationType.CC_PROVIDER;
  const distance = location.distance;

  return (
    <div>
      {distance && (
        <p>
          <span>
            <img
              src="https://i.ibb.co/YfF36cy/icons8-circled-2-20.png"
              alt="alt text"
              style={{ float: 'left', 'padding-right': 7 }}
            />
            {distance.toFixed(1)} miles
          </span>
        </p>
      )}
      {isProvider ? (
        <span>
          <ProviderServiceDescription provider={location} />
          <h2 className="vads-u-font-size--h5">
            <Link to={`provider/${location.id}`}>{name}</Link>
          </h2>
          {location.attributes.orgName && (
            <h6>{location.attributes.orgName}</h6>
          )}
        </span>
      ) : (
        <span>
          <FacilityTypeDescription location={location} />
          <h2 className="vads-u-font-size--h5">
            <Link to={`facility/${location.id}`}>{name}</Link>
          </h2>
        </span>
      )}
      <p>
        <LocationAddress location={location} />
      </p>
    </div>
  );
};

LocationInfoBlock.propTypes = {
  location: PropTypes.object,
};
export default LocationInfoBlock;
