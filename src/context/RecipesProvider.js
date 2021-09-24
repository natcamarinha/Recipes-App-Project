import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  ApiMealsIngredient,
  ApiMealsName,
  ApiMealsFirstLetter,
} from '../services/MealApi';
import {
  ApiDrinksIngredient,
  ApiDrinksLetter,
  ApiDrinksName,
} from '../services/DrinkApi';

function RecipesProvider({ children }) {
  const [redirect, setRedirect] = useState(false);
  const [recipesDb, setRecipesDb] = useState([]);

  function visibleAlert(data) { // Alert Req 18
    if (data === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setRecipesDb(data);
    }
  }

  async function handleSearchMeals(searchText, filterRadio) {
    let data = [];
    if (filterRadio === 'ingredient') {
      data = await ApiMealsIngredient(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'name') {
      data = await ApiMealsName(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'firstLetter') {
      if (searchText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      data = await ApiMealsFirstLetter(searchText);
      visibleAlert(data);
    }
    if (data !== null && data.length === 1) {
      setRedirect(true);
    }
  }

  async function handleSearchDrinks(searchText, filterRadio) {
    let data = [];
    if (filterRadio === 'ingredient') {
      data = await ApiDrinksIngredient(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'name') {
      data = await ApiDrinksName(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'firstLetter') {
      if (searchText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      data = await ApiDrinksLetter(searchText);
      visibleAlert(data);
    }
    if (data !== null && data.length === 1) {
      setRedirect(true);
    }
  }
  // inputs e pathname vem como parametro da função que é disparada na searchBar
  function handleSearch(inputs, pathname) {
    const { searchText, filterRadio } = inputs;
    if (pathname.includes('comidas')) {
      handleSearchMeals(searchText, filterRadio);
    }
    if (pathname.includes('bebidas')) {
      handleSearchDrinks(searchText, filterRadio);
    }
  }

  const context = {
    handleSearch,
    recipesDb,
    redirect,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
