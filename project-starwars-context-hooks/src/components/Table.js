import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import RenderTable from './RenderTable';
import SelectFilters from './SelectFilters';
import FiltersList from './FiltersList';
import FilterSort from './FilterSort';

function Table() {
  const { isFetching, data, getPlanetsData, filterName } = useContext(
    StarWarsContext,
  );

  const isDataPresent = data.length > 0;

  useEffect(() => {
    getPlanetsData();
  }, [getPlanetsData]);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={(event) => filterName(event.target.value)}
      />
      <SelectFilters />
      <FiltersList />
      <FilterSort />
      {isFetching && 'Loading...'}
      {!isFetching && isDataPresent && <RenderTable />}
    </div>
  );
}

export default Table;
