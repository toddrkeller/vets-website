import React, { Component } from 'react';
import FacilityTypeDropdown from './FacilityTypeDropdown';
import ServiceTypeAhead from './ServiceTypeAhead';
import recordEvent from '../../../platform/monitoring/record-event';
import { LocationType } from '../constants';
import {
  healthServices,
  benefitsServices,
  vetCenterServices,
  urgentCareServices,
  pharmacies,
} from '../config';
import { focusElement } from 'platform/utilities/ui';

class SearchControls extends Component {
  handleEditSearch = () => {
    this.props.onChange({ active: false });
  };

  handleQueryChange = e => {
    this.props.onChange({ searchString: e.target.value });
  };

  handleFacilityTypeChange = option => {
    this.props.onChange({ facilityType: option, serviceType: null });
  };

  handleServiceTypeChange = ({ target }) => {
    const option = target.value;
    const serviceType = option === 'All' ? null : option;
    this.props.onChange({ serviceType });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { facilityType, serviceType } = this.props.currentQuery;

    if (facilityType === LocationType.CC_PROVIDER) {
      if (!serviceType) {
        focusElement('#service-type-ahead-input');
        return;
      }
    }

    // Report event here to only send analytics event when a user clicks on the button
    recordEvent({
      event: 'fl-search',
      'fl-search-fac-type': facilityType,
    });

    this.props.onSubmit();
  };

  renderServiceTypeDropdown = () => {
    const { facilityType, serviceType } = this.props.currentQuery;
    const { isMobile } = this.props;
    const disabled = ![
      LocationType.HEALTH,
      LocationType.BENEFITS,
      LocationType.VET_CENTER,
      LocationType.CC_PROVIDER,
      LocationType.URGENT_CARE,
    ].includes(facilityType);

    let services;
    // Determine what service types to display for the location type (if any).
    switch (facilityType) {
      case LocationType.URGENT_CARE:
        services = urgentCareServices;
        break;
      case LocationType.URGENT_CARE_FARMACIES:
        services = pharmacies;
        break;
      case LocationType.HEALTH:
        services = healthServices;
        break;
      case LocationType.BENEFITS:
        services = benefitsServices;
        break;
      case LocationType.VET_CENTER:
        services = vetCenterServices.reduce(result => result, {
          All: 'Show all facilities',
        });
        break;
      case LocationType.CC_PROVIDER:
        return (
          <ServiceTypeAhead
            onSelect={this.handleServiceTypeChange}
            initialSelectedServiceType={serviceType}
          />
        );
      default:
        services = {};
    }

    // Create option elements for each VA service type.
    const options = Object.keys(services).map(service => (
      <option key={service} value={service} style={{ fontWeight: 'bold' }}>
        {services[service]}
      </option>
    ));

    return (
      <span>
        <label htmlFor="service-type-dropdown">Choose a service type</label>
        <select
          id="service-type-dropdown"
          className={isMobile ? null : 'desktop-align-3'}
          style={{ fontWeight: 'bold' }}
          disabled={disabled}
          value={serviceType || ''}
          onChange={this.handleServiceTypeChange}
        >
          {options}
        </select>
      </span>
    );
  };

  render() {
    const { currentQuery, isMobile, showCommunityCares } = this.props;

    if (currentQuery.active && isMobile) {
      return (
        <div className="search-controls-container">
          <button className="small-12" onClick={this.handleEditSearch}>
            Edit Search
          </button>
        </div>
      );
    }

    return (
      <div
        className={
          isMobile
            ? 'search-main-container'
            : 'search-main-container desktop-size'
        }
      >
        <div className={isMobile ? null : 'desktop-align'}>
          <label
            htmlFor="street-city-state-zip"
            id="street-city-state-zip-label"
          >
            Search by city, state or ZIP Code
          </label>
          <input
            form="facility-search-controls"
            id="street-city-state-zip"
            name="street-city-state-zip"
            type="text"
            style={{ fontWeight: 'bold' }}
            onChange={this.handleQueryChange}
            value={currentQuery.searchString}
            title="Your location: Street, City, State or Zip"
            required
          />
        </div>
        <div className="search-controls-container clearfix">
          <form
            id="facility-search-controls"
            className="row"
            onSubmit={this.handleSubmit}
          >
            <div
              className={
                isMobile
                  ? 'columns medium-3-5'
                  : ' columns medium-3-5 desktop-align'
              }
            >
              <FacilityTypeDropdown
                isMobile={this.props.isMobile}
                facilityType={this.props.currentQuery.facilityType}
                onChange={this.handleFacilityTypeChange}
                showCommunityCares={showCommunityCares}
              />
            </div>
            <div
              className={
                isMobile
                  ? 'columns medium-3-5'
                  : 'columns medium-3-5 desktop-align-2'
              }
            >
              {this.renderServiceTypeDropdown()}
            </div>
            <div
              className={
                isMobile
                  ? 'columns medium-1-2'
                  : 'columns medium-3-5 desktop-align-4'
              }
            >
              <input type="submit" value="Search" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchControls;
