import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { axe, toHaveNoViolations } from 'jest-axe';
import { shallow, mount } from 'enzyme';
import ConnectedVAMap, { VAMap } from '../containers/VAMap';
import { INITIAL_STATE as queryState } from '../reducers/searchQuery';
import { INITIAL_STATE as resultState } from '../reducers/searchResult';

describe('VAMap 508 Accessibility Testing via aXe', () => {
  expect.extend(toHaveNoViolations);

  describe('Unconnected Component Tests', () => {
    const initialProps = {
      currentQuery: queryState,
      results: resultState.results,
      pagination: resultState.pagination,
      selectedResult: resultState.selectedResult,
      location: { query: {} }, // react-router location object
      // functions
      fetchVAFacility: jest.fn(),
      updateSearchQuery: jest.fn(),
      genBBoxFromAddress: jest.fn(),
      searchWithBounds: jest.fn(),
    };

    test('Initial page load has no violations', async () => {
      const wrapper = shallow(<VAMap { ...initialProps }/>);
      const results = await axe(wrapper.debug());

      expect(results).toHaveNoViolations();
    });
  });

  describe('Connected Component Tests', () => {
    const middleware = [thunk];
    const state = {
      searchQuery: { ...queryState },
      searchResult: { ...resultState }
    };

    test('Initial page load has no violations.', async () => {
      const mockStore = configureMockStore(middleware)(state);
      const connectedWrapper = mount(
        <Provider store={mockStore}>
          {/* Manually add the react-router location prop */}
          <ConnectedVAMap location={{ query: {} }}/>
        </Provider>
      );

      const results = await axe(connectedWrapper.html());

      expect(results).toHaveNoViolations();
    });
  });
});
