import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState({
    searchText: '',
    filterRadio: 'ingredient',
  });
  const location = useLocation();
  const { handleSearch } = useContext(RecipesContext);

  function handleInput({ target: { name, value } }) {
    setSearchInput({ ...searchInput, [name]: value });
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        name="searchText"
        onChange={ handleInput }
      />
      <label htmlFor="search-ingredients">
        Ingrediente
        <input
          id="search-ingredients"
          type="radio"
          name="filterRadio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="search-name">
        Nome
        <input
          id="search-name"
          type="radio"
          name="filterRadio"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="search-firstLetter">
        Primeira Letra
        <input
          id="search-firstLetter"
          type="radio"
          name="filterRadio"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ handleInput }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        disabled={ (searchInput.searchText.length === 0) }
        onClick={ () => handleSearch(searchInput, location.pathname) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
