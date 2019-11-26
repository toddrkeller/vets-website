import React from 'react';

import RoutedSavableApp from '../../platform/forms/save-in-progress/RoutedSavableApp';
import formConfig from './config/form';

const CaregiversEntry = ({ location, children }) => (
  <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
    {children}
  </RoutedSavableApp>
);

export default CaregiversEntry;
