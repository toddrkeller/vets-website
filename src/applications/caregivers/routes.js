import { createRoutesWithSaveInProgress } from '../../platform/forms/save-in-progress/helpers';

import formConfig from './config/form';
import CaregiversApp from './CaregiversApp.jsx';

const route = {
  path: '/',
  component: CaregiversApp,
  indexRoute: { onEnter: (nextState, replace) => replace('/introduction') },
  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default route;
