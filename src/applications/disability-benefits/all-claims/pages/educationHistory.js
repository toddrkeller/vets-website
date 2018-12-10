export const uiSchema = {
  'ui:title': 'Education & training',
  //  'ui:description': '',
  education: {
    'ui:title': 'What‘s the highest level of education you‘ve completed?',
  },
  receivedOtherEducationTrainingPreUnemployability: {
    'ui:title': ' ',
    'ui:options': {
      expandUnder: 'education',
      expandUnderCondition: 'Other',
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    education: {
      type: 'string',
      enum: [
        'Some elementary school',
        'Some high school',
        'High school diploma or GED',
        'Some college',
        'Associate‘s degree',
        'Bachelor‘s degree',
        'Master‘s degree',
        'Doctoral degree',
        'Other',
      ],
    },
  },
};
