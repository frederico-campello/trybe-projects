const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function getPlanetsData() {
  const planets = await fetch(API_URL);
  return planets.json();
}
