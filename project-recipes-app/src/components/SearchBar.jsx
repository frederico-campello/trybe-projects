import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FetchThemealAPI, { requestResetAPI, requestResetRecipes } from '../actions/themealdb';
import { searchResultMoreOne } from '../actions/searchBarAction';

const updateSearchBar = (event, searchSetting, setSearchSetting) => {
  setSearchSetting({ ...searchSetting, [event.target.name]: event.target.value });
};
const rendersSearchInput = (searchSetting, setSearchSetting) => (
  <label htmlFor="searchInput">
    searchedValue
    <input
      name="searchedValue"
      type="text"
      value={searchSetting.searchedValue}
      data-testid="search-input"
      onChange={(event) =>
        updateSearchBar(event, searchSetting, setSearchSetting)
      }
    />
  </label>
);
const rendersSearchOption = (searchSetting, setSearchSetting) => {
  const searchOptionInput = [{ label: 'ingredient', value: 'ingredient', testid: 'ingredient-search-radio' },
  { label: 'Nome', value: 'name', testid: 'name-search-radio' },
  { label: 'Primeira letra', value: 'firstLetter', testid: 'first-letter-search-radio' },
  ];
  return (
    <div>
      <form>
        {searchOptionInput.map((item) => (
          <label htmlFor="searchedOption" key={item.label}>
            {item.label}
            <input
              name="searchOption"
              type="radio"
              value={item.value}
              data-testid={item.testid}
              onChange={(event) =>
                updateSearchBar(event, searchSetting, setSearchSetting)
              }
            />
          </label>
        ))
        }
      </form>
    </div>
  );
};
const routingAfterAPI = (recipes, dispatch, searchSetting, setSearchSetting) => {
  if (recipes == null) {
    dispatch(requestResetRecipes());
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (recipes.length === 1) {
    const id = `${recipes[0][Object.keys(recipes[0])[0]]}`;
    return setSearchSetting({ ...searchSetting, recipesEqualOne: true, recipeId: id });
  }
  if (recipes.length > 1) return dispatch(searchResultMoreOne());
  return null;
};


const getPageType = (currLocation, id) => {
  let pathname;
  if (currLocation === '/comidas') pathname = `/comidas/${id}`;
  if (currLocation === '/bebidas') pathname = `/bebidas/${id}`;
  return pathname;
};


const SearchBar = () => {
  const { recipes } = useSelector((state) => state.ThemealDB);
  const { currentLocation } = useSelector((state) => state.updateLocation);
  const [searchSetting, setSearchSetting] = useState({
    searchedValue: '',
    searchOption: '',
    recipesEqualOne: false,
    recipeId: '',
  });
  const dispatch = useDispatch();
  const id = searchSetting.recipeId;

  // const initialPath = currentLocation === '/comidas' ? `/comidas/${id}` : `/bebidas/${id}`;
  const initialPath = getPageType(currentLocation, id);

  useEffect(() => {
    dispatch(requestResetAPI());
    setSearchSetting({ ...searchSetting, recipesEqualOne: false });
  }, []); //  reset isFetching to false when load
  useEffect(() => {
    routingAfterAPI(recipes, dispatch, searchSetting, setSearchSetting);
  }, [recipes]);
  const submitSearch = () => {
    if (searchSetting.searchOption === 'firstLetter' && searchSetting.searchedValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      dispatch(FetchThemealAPI(searchSetting));
    }
  };
  return (
    <div>
      {searchSetting.recipesEqualOne ? (<Redirect push to={`${initialPath}`} />) : null}
      {rendersSearchInput(searchSetting, setSearchSetting)}
      {rendersSearchOption(searchSetting, setSearchSetting)}
      <button data-testid="exec-search-btn" onClick={() => submitSearch()}>
        search
    </button>
    </div>
  );
};
export default SearchBar;
