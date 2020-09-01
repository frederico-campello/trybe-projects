import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPlanets, filterByName } from '../actions';

import RenderTable from './RenderTable';
import SelectFilter from './SelectFilter';
import FiltersList from './FiltersList';
import FilterSort from './FilterSort';

class Table extends Component {
  componentDidMount() {
    const { getPlanetsData } = this.props;
    getPlanetsData();
  }

  render() {
    const { isFetching, arrayPlanets, filterName } = this.props;
    return (
      <div>
        <div>StarWars Datatable with Filters</div>
        <input
          type="text"
          data-testid="name-filter"
          onChange={(event) => filterName(event.target.value)}
        />
        <SelectFilter />
        <FiltersList />
        <FilterSort />
        {isFetching && 'Loading...'}
        {arrayPlanets.length > 0 && <RenderTable />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.starWarsAPIReducer.isFetching,
  arrayPlanets: state.starWarsAPIReducer.data,
  numericFilters: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanetsData: () => dispatch(fetchPlanets()),
  filterName: (payload) => dispatch(filterByName(payload)),
});

Table.propTypes = {
  getPlanetsData: PropTypes.func.isRequired,
  filterName: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  arrayPlanets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      diameter: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      gravity: PropTypes.string,
      population: PropTypes.string,
      climate: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      films: PropTypes.array,
      url: PropTypes.string,
      created: PropTypes.string,
      edited: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
