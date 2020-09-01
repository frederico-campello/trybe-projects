import getPlanetsData from '../services/StarWarsAPI';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const REQUEST_PLANETS_SUCCESS = 'REQUEST_PLANETS_SUCCESS';

export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_NUMERIC_VALUES = 'FILTER_BY_NUMERIC_VALUES';
export const UPDATE_NUMERIC_FILTERS = 'UPDATE_NUMERIC_FILTERS';

export const SELECT_COLUMN = 'SELECT_COLUMN';
export const SELECT_COMPARISON = 'SELECT_COMPARISON';
export const SELECT_NUMBER = 'SELECT_NUMBER';

export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';

export const UPDATE_ORDER_COLUMN = 'UPDATE_ORDER_COLUMN';
export const UPDATE_ORDER_SORT = 'UPDATE_ORDER_SORT';

export const UPDATE_ORDER_FILTER = 'UPDATE_ORDER_FILTER';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const receivePlanets = (json) => ({
  type: REQUEST_PLANETS_SUCCESS,
  data: json.results,
});

export const filterByName = (payload) => ({
  type: FILTER_BY_NAME,
  payload,
});

export const filterByNumericValues = (payload) => ({
  type: FILTER_BY_NUMERIC_VALUES,
  payload,
});

export const updateNumericFilters = (payload) => ({
  type: UPDATE_NUMERIC_FILTERS,
  payload,
});

export const selectColumn = (payload) => ({
  type: SELECT_COLUMN,
  payload,
});

export const selectComparison = (payload) => ({
  type: SELECT_COMPARISON,
  payload,
});

export const selectNumber = (payload) => ({
  type: SELECT_NUMBER,
  payload,
});

export const updateOptions = (payload) => ({
  type: UPDATE_OPTIONS,
  payload,
});

export const updateOrderColumn = (payload) => ({
  type: UPDATE_ORDER_COLUMN,
  payload,
});

export const updateOrderSort = (payload) => ({
  type: UPDATE_ORDER_SORT,
  payload,
});

export const updateOrderFilter = (payload) => ({
  type: UPDATE_ORDER_FILTER,
  payload,
});

export function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestPlanets());

    return getPlanetsData().then((json) => dispatch(receivePlanets(json)));
  };
}
