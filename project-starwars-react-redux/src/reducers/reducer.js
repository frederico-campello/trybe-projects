import {
  REQUEST_PLANETS,
  REQUEST_PLANETS_SUCCESS,
  FILTER_BY_NAME,
  FILTER_BY_NUMERIC_VALUES,
  UPDATE_NUMERIC_FILTERS,
  SELECT_COLUMN,
  SELECT_COMPARISON,
  SELECT_NUMBER,
  UPDATE_ORDER_COLUMN,
  UPDATE_ORDER_SORT,
  UPDATE_ORDER_FILTER,
} from '../actions/index';

const INITIAL_STATE_API = {
  isFetching: false,
  data: [],
};

const INITIAL_STATE_FILTERS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

const INITIAL_STATE_SELECT = {
  column: '',
  comparison: '',
  value: '',
};

const INITIAL_STATE_SORT = {
  column: '',
  sort: '',
};

export const starWarsAPIReducer = (state = INITIAL_STATE_API, action) => {
  switch (action.type) {
    case REQUEST_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_PLANETS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const filters = (state = INITIAL_STATE_FILTERS, action) => {
  switch (action.type) {
    case FILTER_BY_NAME:
      return {
        ...state,
        filterByName: {
          name: action.payload,
        },
      };
    case FILTER_BY_NUMERIC_VALUES:
      return {
        ...state,
        filterByNumericValues: [...state.filterByNumericValues, action.payload],
      };
    case UPDATE_NUMERIC_FILTERS:
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues.filter(
            (item) => item !== action.payload,
          ),
        ],
      };
    case UPDATE_ORDER_FILTER:
      return {
        ...state,
        order: { column: action.payload.column, sort: action.payload.sort },
      };
    default:
      return state;
  }
};

export const selectFilter = (state = INITIAL_STATE_SELECT, action) => {
  switch (action.type) {
    case SELECT_COLUMN:
      return {
        ...state,
        column: action.payload,
      };
    case SELECT_COMPARISON:
      return {
        ...state,
        comparison: action.payload,
      };
    case SELECT_NUMBER:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export const changeSort = (state = INITIAL_STATE_SORT, action) => {
  switch (action.type) {
    case UPDATE_ORDER_COLUMN:
      return {
        ...state,
        column:
          action.payload.charAt(0).toUpperCase() + action.payload.slice(1),
      };
    case UPDATE_ORDER_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
};
