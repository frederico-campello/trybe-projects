import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const options = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

function FilterSort() {
  const { changeSort } = useContext(StarWarsContext);

  const [column, setColumn] = useState('Name');
  const [sort, setSort] = useState('ASC');

  return (
    <div>
      <label htmlFor="ASC">
        ASC
        <input
          name="order"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          defaultChecked
          onChange={(event) => setSort(event.target.value)}
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          name="order"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={(event) => setSort(event.target.value)}
        />
      </label>
      <select
        data-testid="column-sort"
        onChange={(event) => setColumn(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={() => changeSort(column, sort)}
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterSort;
