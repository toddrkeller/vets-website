import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default function createRatedDisabilitiesTable(store, widgetType) {
  const root = document.querySelector(`[data-widget-type="${widgetType}"]`);
  if (root) {
    import('./rated-disabilities-entry').then(module => {
      const [RatedDisabilitiesTable] = module.default;
      ReactDOM.render(
        <Provider store={store}>
          <RatedDisabilitiesTable />
        </Provider>,
      );
    });
  }
}
π;
