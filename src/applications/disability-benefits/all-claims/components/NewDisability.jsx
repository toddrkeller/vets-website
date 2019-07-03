import React from 'react';
import { capitalizeEachWord } from '../utils';

export default function NewDisability({ formData, classification }) {
  return (
    <div>
      <strong>{capitalizeEachWord(formData.condition)}</strong>
      <br />
      {classification}
    </div>
  );
}
