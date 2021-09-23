import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function Comidas() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const elementsNumber = 12;

  const categoryNumber = 5;

  const pageTitle = 'Comidas';

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => setMeals(res.meals));
  }, []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((res) => setCategories(res.meals));
  }, []);

  function handleClick(category) {
    setSelectedCategory(category);
  }

  if (meals.length === 0) {
    return <h6>Loading...</h6>;
  }

  return (
    <div>
      <Header value={ pageTitle } />
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

      { meals
        .filter((meal) => meal.strCategory === selectedCategory)
        .map((mealSelected, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ mealSelected.strMealthumb }
              alt="meal"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ mealSelected.strMeal }</p>
          </div>
        )).slice(0, elementsNumber)}

      { meals
        .map((meal, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt="meal"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
          </div>
        )).slice(0, elementsNumber)}
    </div>
  );
}
