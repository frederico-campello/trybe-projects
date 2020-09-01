import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FiltersList() {
  const { filters, removeFilter } = useContext(StarWarsContext);
  const arrayFilters = filters.filterByNumericValues;
  return (
    <div>
      <h1>Filtros</h1>
      {arrayFilters.map((filter) => (
        <span data-testid="filter" key={filter.value}>
          <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
          <button type="button" onClick={() => removeFilter(filter)}>
            X
          </button>
        </span>
      ))}
    </div>
  );
}

export default FiltersList;
