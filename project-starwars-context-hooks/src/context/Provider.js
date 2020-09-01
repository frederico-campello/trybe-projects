import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanetsData from '../services/StarWarsAPI';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
      filters: {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [],
      },
      order: { column: 'Name', sort: 'ASC' },
    };
    this.fetchPlanets = this.fetchPlanets.bind(this);
    this.handlePlanetsDataSuccess = this.handlePlanetsDataSuccess.bind(this);
    this.handleFilterName = this.handleFilterName.bind(this);
    this.handleFilterNumeric = this.handleFilterNumeric.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  fetchPlanets() {
    const { isFetching } = this.state;

    if (isFetching) return;

    this.setState({ isFetching: true });

    getPlanetsData().then(this.handlePlanetsDataSuccess);
  }

  handlePlanetsDataSuccess(json) {
    this.setState({
      isFetching: false,
      data: json.results,
    });
  }

  handleFilterName(inputName) {
    this.setState({
      filters: {
        ...this.state.filters,
        filterByName: {
          name: inputName,
        },
      },
    });
  }

  handleFilterNumeric(obj) {
    this.setState({
      filters: {
        ...this.state.filters,
        filterByNumericValues: [
          ...this.state.filters.filterByNumericValues,
          obj,
        ],
      },
    });
  }

  handleRemoveFilter(filter) {
    this.setState({
      filters: {
        ...this.state.filters,
        filterByNumericValues: [
          ...this.state.filters.filterByNumericValues.filter(
            (item) => item !== filter,
          ),
        ],
      },
    });
  }

  handleSort(column, sort) {
    this.setState({
      order: {
        column,
        sort,
      },
    });
  }

  render() {
    const contextValue = {
      ...this.state,
      getPlanetsData: this.fetchPlanets,
      filterName: this.handleFilterName,
      filterNumeric: this.handleFilterNumeric,
      removeFilter: this.handleRemoveFilter,
      changeSort: this.handleSort,
    };

    const { children } = this.props;

    return (
      <StarWarsContext.Provider value={contextValue}>
        {children}
      </StarWarsContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
