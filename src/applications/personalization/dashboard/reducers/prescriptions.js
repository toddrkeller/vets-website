import assign from 'lodash/fp/assign';
import set from 'lodash/fp/set';

const initialState = {
  currentItem: null,
  items: null,
  active: {
    loading: false,
    sort: {
      value: 'prescriptionName',
      order: 'ASC',
    },
    page: 1,
    pages: 1,
  },
  history: {
    loading: false,
    sort: {
      value: 'refillSubmitDate',
      order: 'DESC',
    },
    page: 1,
    pages: 1,
  },
  detail: {
    loading: false,
  },
};

export default function prescriptions(state = initialState, action) {
  switch (action.type) {
    case 'LOADING_ACTIVE':
      return set('active.loading', true, state);

    case 'LOADING_HISTORY':
      return set('history.loading', true, state);

    case 'LOAD_PRESCRIPTIONS_FAILURE': {
      const section = action.active ? 'active' : 'history';
      const loadingState = set(`${section}.loading`, false, state);
      const errorState = set(
        `${section}.errors`,
        (action.payload && action.payload.errors) || [],
        loadingState,
      );
      return set('items', null, errorState);
    }

    case 'LOAD_PRESCRIPTIONS_SUCCESS': {
      const sort = action.payload.meta.sort;
      const sortValue = Object.keys(sort)[0];
      const sortOrder = sort[sortValue];
      const pagination = action.payload.meta.pagination;
      const newState = { items: action.payload.data };

      if (action.active) {
        newState.active = {
          loading: false,
          sort: { value: sortValue, order: sortOrder },
          page: pagination.currentPage,
          pages: pagination.totalPages,
        };
      } else {
        newState.history = {
          loading: false,
          sort: { value: sortValue, order: sortOrder },
          page: pagination.currentPage,
          pages: pagination.totalPages,
        };
      }

      return assign(state, newState);
    }

    default:
      return state;
  }
}
