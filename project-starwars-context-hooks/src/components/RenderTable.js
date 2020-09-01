import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const filterData = (datatable, name, numericFilters) => {
  let filteredData = [];
  if (name === '') filteredData = datatable;
  if (name !== '') {
    filteredData = datatable.filter((planet) => planet.name.includes(name));
  }
  if (numericFilters.length > 0) {
    numericFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] > Number(filter.value),
        );
      }
      if (filter.comparison === 'menor que') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] < Number(filter.value),
        );
      }
      if (filter.comparison === 'igual a') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] === filter.value,
        );
      }
    });
  }
  return filteredData;
};

const numericKeys = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const ascSortNumber = (filtered, column) =>
  filtered.sort((a, b) => Number(a[column]) - Number(b[column]));

const ascSortString = (filtered, column) =>
  filtered.sort((a, b) => {
    if (a[column] > b[column]) return 1;
    if (a[column] < b[column]) return -1;
    return 0;
  });

const orderAscDesc = (filtered, column, sort) => {
  const sorted = numericKeys.includes(column)
    ? ascSortNumber(filtered, column)
    : ascSortString(filtered, column);
  return sort === 'DESC' ? sorted.reverse() : sorted;
};

function RenderTable() {
  const { data, filters, order } = useContext(StarWarsContext);
  const name = filters.filterByName.name;
  const arrayFilters = filters.filterByNumericValues;
  const column = order.column.toLowerCase();
  const sort = order.sort;

  const filtered = filterData(data, name, arrayFilters);
  const sorted = orderAscDesc(filtered, column, sort);

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0])
            .filter((element) => element !== 'residents')
            .map((key) => (
              <th key={key}>{key}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map(({ residents, ...planet }) => (
          <tr key={planet.name}>
            <td data-testid="planet-name">{planet.name}</td>
            {Object.values(planet)
              .filter((value) => value !== planet.name)
              .map((value) => (
                <td key={value}>{value}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RenderTable;
