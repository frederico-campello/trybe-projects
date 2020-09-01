import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const comparisonOptions = ['Comparação', 'maior que', 'menor que', 'igual a'];

const options = [
  'Coluna',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function SelectFilters() {
  const { filters, filterNumeric } = useContext(StarWarsContext);

  const arrayColumns = filters.filterByNumericValues.map(
    (filter) => filter.column,
  );

  const [column, setFilterColumn] = useState('');
  const [comparison, setFilterComparison] = useState('');
  const [value, setFilterValue] = useState('');

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={(event) => setFilterColumn(event.target.value)}
      >
        {options
          .filter((option) => !arrayColumns.includes(option))
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={(event) => setFilterComparison(event.target.value)}
      >
        {comparisonOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={(event) => setFilterValue(event.target.value)}
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={() => filterNumeric({ column, comparison, value })}
      >
        Filtrar
      </button>
    </div>
  );
}

export default SelectFilters;
