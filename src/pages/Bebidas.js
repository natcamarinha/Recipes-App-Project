import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Bebidas() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const elementsNumber = 12;

  const categoryNumber = 5;

  const pageTitle = 'Bebidas';
  const limits = 12;
  const { recipesDb, redirect } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => setDrinks(data.drinks));
  }, []);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((data) => setCategories(data.drinks));
  }, []);

  function handleClick(category) {
    setSelectedCategory(category);
  }

  if (drinks.length === 0) {
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
        <button type="button" onClick={ () => handleClick(undefined) }>All</button>

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
      { drinks
        .filter((drink) => drink.strCategory === selectedCategory)
        .map((drinkSelected, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drinkSelected.strDrinkThumb }
              alt="drink"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ drinkSelected.strDrink }</p>
            <p data-testid={ `${selectedCategory}-category-filter` } />
          </div>
        )).slice(0, elementsNumber)}

      { drinks
        .map((drink, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt="drink"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
          </div>
        )).slice(0, elementsNumber)}
      <Footer />
    </div>
  );
}
