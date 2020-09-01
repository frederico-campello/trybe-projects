import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filterByNumericValues,
  selectColumn,
  selectComparison,
  selectNumber,
} from '../actions';

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

const options = [
  'Coluna',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

class SelectFilter extends Component {
  renderSelectColumn() {
    const { changeColumn, numericFilters } = this.props;
    return (
      <select
        data-testid="column-filter"
        onChange={(event) => changeColumn(event.target.value)}
      >
        {options
          .filter((option) => !numericFilters.includes(option))
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    );
  }

  renderSelectComparison() {
    const { changeComparison } = this.props;
    return (
      <select
        data-testid="comparison-filter"
        onChange={(event) => changeComparison(event.target.value)}
      >
        <option defaultValue>Comparação</option>
        {comparisonOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  renderInputNumber() {
    const { changeNumber } = this.props;
    return (
      <input
        type="number"
        data-testid="value-filter"
        onChange={(event) => changeNumber(event.target.value)}
      />
    );
  }

  render() {
    const {
      column, comparison, number, saveNumericFilter,
    } = this.props;
    return (
      <div>
        {this.renderSelectColumn()}
        {this.renderSelectComparison()}
        {this.renderInputNumber()}
        <button
          type="button"
          data-testid="button-filter"
          onClick={() => {
            saveNumericFilter({ column, comparison, value: number });
          }}
        >
          Filtrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  column: state.selectFilter.column,
  comparison: state.selectFilter.comparison,
  number: state.selectFilter.value,
  numericFilters: state.filters.filterByNumericValues.map(
    (filter) => filter.column,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  saveNumericFilter: (payload) => dispatch(filterByNumericValues(payload)),
  changeColumn: (payload) => dispatch(selectColumn(payload)),
  changeComparison: (payload) => dispatch(selectComparison(payload)),
  changeNumber: (payload) => dispatch(selectNumber(payload)),
});

SelectFilter.propTypes = {
  changeColumn: PropTypes.func.isRequired,
  changeComparison: PropTypes.func.isRequired,
  changeNumber: PropTypes.func.isRequired,
  saveNumericFilter: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  numericFilters: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      comparison: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectFilter);
