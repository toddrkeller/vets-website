import React from 'react';
import { capitalizeEachWord } from '../utils';

export default function NewDisability({ formData, onEdit }) {
  return (
    <div className="view-new-disability-container">
      <div className="row small-collapse">
        <div class="small-8 left columns">
          <h3>{capitalizeEachWord(formData.condition)}</h3>
        </div>
        <div class="small-4 right columns">
          <button className="usa-button-secondary float-right" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
      <hr />
      <p>{formData.classification}</p>
    </div>
  );
}
