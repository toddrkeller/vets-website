import React from 'react';
import PropTypes from 'prop-types';

const RatedDisabilityListItem = ({ ratedDisability }) => {
  const {
    decisionText,
    ratingPercentage,
    name,
    effectiveDate,
    relatedTo,
  } = ratedDisability;
  return (
    <div className="vads-l-row vads-u-margin-bottom--2 vads-u-padding-x--1p5 vads-u-padding-bottom--2p5 vads-u-background-color--gray-lightest" tabindex="0">   
        <h3 className="vads-u-width--full vads-u-margin--0p5 vads-u-padding-top--1p5 vads-u-padding-bottom--0p5 vads-u-font-family--sans vads-u-line-height--1 vads-u-display--flex">
          <span className="vads-u-flex--4"> 
            {name}
          </span>
          <span className="vads-u-padding-left--2 vads-u-flex--1 vads-u-text-align--right"> 
            {ratingPercentage}%
          </span>
        </h3>
        <p className="vads-u-margin--0p5">
          {decisionText === 'Service Connected' ? (
            <i className="fas fa-medal vads-u-margin-right--1" />
          ) : null}
          <span className="vads-u-font-weight--bold">{decisionText}</span>
        </p>
        <p className="vads-u-display--none small-screen:vads-u-display--inline vads-u-margin--0p5">
          <span className="vads-u-margin-x--1"> | </span> 
        </p>
        <p className="vads-u-margin--0p5">Related To: {relatedTo}</p>  
        <p className="vads-u-width--full vads-u-margin--0p5">Effective date: {effectiveDate}</p>
    </div>
  );
};

RatedDisabilityListItem.propTypes = {
  ratedDisability: PropTypes.object.isRequired,
};

export default RatedDisabilityListItem;
