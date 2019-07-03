import React from 'react';
import { capitalizeEachWord } from '../utils';

export default function NewDisability({ formData }) {
  return (
    <div>
      <strong>{capitalizeEachWord(formData.condition)}</strong>
      <br />
      {formData.classification}
    </div>
  );
}
