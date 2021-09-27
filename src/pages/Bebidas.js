import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Bebidas() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [filterCategory, setFilterCategory] = useState([]);

  const categoryNumber = 5;

  const pageTitle = 'Bebidas';
  const limits = 12;
  const { recipesDb, redirect } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinks(data.drinks));
  }, []);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setCategories(data.drinks));
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setFilterCategory(data.drinks));
    }
  }, [selectedCategory]);

  function handleClick(category) {
    setSelectedCategory(category);
  }

  if (drinks.length < 1) {
    return <h6>Loading...</h6>;
  }

  return (
    <div>
      <Header value={ pageTitle } />
      { redirect ? history.push(`/bebidas/${recipesDb.map((drink) => drink.idDrink)}`) : (
        <div>
          {
            recipesDb.map((drink, index) => (// requisito 17, card com limite de 12
              (index < limits) && (
                <div key={ index }>
                  <div>
                    <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
                  </div>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ drink.strDrinkThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strDrink }
                      width="150px"
                    />
                  </div>
                </div>
              )
            ))
          }
        </div>
      ) }
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClick(undefined) }
        >
          All
        </button>

        { categories
          .map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              key={ index }
              onClick={ () => handleClick(category.strCategory) }
            >
              { category.strCategory }
            </button>
          )).slice(0, categoryNumber)}
      </div>
      <div>
        { selectedCategory !== undefined ? (
          filterCategory
            .map((drinkFiltered, index) => (
              <Link key={ index } to={ `/bebidas/${drinkFiltered.idDrink}` }>
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ drinkFiltered.strDrinkThumb }
                    alt="meal"
                    width="100px"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{drinkFiltered.strDrink}</p>
                  <p data-testid={ `${selectedCategory}-category-filter` } />
                </div>
              </Link>
            )).slice(0, limits))

          : drinks
            .map((drink, index) => (
              <Link key={ index } to={ `/bebidas/${drink.idDrink}` }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ drink.strDrinkThumb }
                    alt="meal"
                    width="150px"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
                </div>
              </Link>
            )).slice(0, limits)}
      </div>
      <Footer />
    </div>
  );
}
