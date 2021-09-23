import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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
      .then((data) => setMeals(data.meals));
  }, []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((data) => setCategories(data.meals));
  }, []);

  function handleClick(category) {
    setSelectedCategory(category);
  }

  if (meals.length < 1) {
    return <h6>Loading...</h6>;
  }

  console.log(meals);
  console.log(categories);
  console.log(selectedCategory);

  return (
    <div>
      <Header value={ pageTitle } />
<<<<<<< HEAD
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

      <div>
        { selectedCategory !== undefined ? (
          meals
            .filter((meal) => meal.strCategory === selectedCategory)
            .map((mealSelected, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                { console.log(mealSelected) }
                <img
                  src={ mealSelected.strMealThumb }
                  alt="meal"
                  width="100px"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ mealSelected.strMeal }</p>
                <p data-testid={ `${selectedCategory}-category-filter` } />
              </div>
            )).slice(0, elementsNumber)
        )
          : meals
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
=======
      { meals
        .map((meal, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt="drink"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
          </div>
        )).slice(0, elementsNumber)}
      <Footer />
>>>>>>> da7e1b0e577e53f8cee65c865c7fb8d538451566
    </div>
  );
}
