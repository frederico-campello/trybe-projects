import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateNumericFilters } from '../actions/index';

const FiltersList = ({ arrayFilters, updateFilters }) => (
  <div>
    <h1>Filtros</h1>
    {arrayFilters.map((filter) => (
      <span data-testid="filter" key={filter.value}>
        <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
        <button type="button" onClick={() => updateFilters(filter)}>
          X
        </button>
      </span>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  arrayFilters: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  updateFilters: (payload) => dispatch(updateNumericFilters(payload)),
});

FiltersList.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  arrayFilters: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      comparison: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersList);
