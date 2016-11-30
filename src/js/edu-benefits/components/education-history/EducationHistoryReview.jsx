import React from 'react';
import { displayDateIfValid } from '../../utils/helpers.js';

export default class EducationHistoryReview extends React.Component {
  render() {
    const { completionDate } = this.props.data;
    return (
      <div>
        <div className="form-review-panel-page-header-row">
          <div className="form-review-panel-page-header"/>
          <button
              className="edit-btn primary-outline"
              onClick={this.props.onEdit}><i className="fa before-text fa-pencil"></i>Edit</button>
        </div>
        <table className="review usa-table-borderless">
          <tbody>
            <tr>
              <td>If you got a high school diploma or high school equivalency certificate, what date did you get it? (month, day, year)</td>
              <td>{displayDateIfValid(completionDate)}</td>
            </tr>
            <tr>
              <td>FAA certificates</td>
              <td className="edu-benefits-pre">{this.props.data.faaFlightCertificatesInformation.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

EducationHistoryReview.propTypes = {
  data: React.PropTypes.object.isRequired
};
