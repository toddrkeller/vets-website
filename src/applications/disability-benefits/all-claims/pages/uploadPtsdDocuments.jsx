import React from 'react';
import fileUploadUI from 'us-forms-system/lib/js/definitions/file';
import environment from '../../../../platform/utilities/environment';

import fullSchema from '/Users/adhocteam/Sites/vets-json-schema/dist/21-526EZ-ALLCLAIMS-schema.json';
import { DocumentDescription } from '../content/uploadPtsdDocuments';
import { PtsdNameTitle } from '../content/ptsdClassification';

const FIFTY_MB = 52428800;

const { ptsd781Attachment } = fullSchema.properties;

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'ui:description': DocumentDescription,
  ptsd781Attachment: fileUploadUI('', {
    itemDescription: 'PTSD 781 form',
    hideLabelText: true,
    fileUploadUrl: `${environment.API_URL}/v0/upload_supporting_evidence`,
    fileTypes: [
      'pdf',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp',
      'tif',
      'tiff',
      'txt',
    ],
    maxSize: FIFTY_MB,
    createPayload: file => {
      const payload = new FormData();
      payload.append('supporting_evidence_attachment[file_data]', file);

      return payload;
    },
    parseResponse: (response, file) => ({
      name: file.name,
      confirmationCode: response.data.attributes.guid,
    }),
    // this is the uiSchema passed to FileField for the attachmentId schema
    // FileField requires this name be used
    attachmentSchema: {
      'ui:title': 'Document type',
    },
    // this is the uiSchema passed to FileField for the name schema
    // FileField requires this name be used
    attachmentName: {
      'ui:title': 'Document name',
    },
  }),
};

export const schema = {
  type: 'object',
  required: ['ptsd781Attachment'],
  properties: { ptsd781Attachment },
};
