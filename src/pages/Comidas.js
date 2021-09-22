import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function Comidas() {
  const [meals, setMeals] = useState([]);

  const elementsNumber = 12;
  
  const pageTitle = 'Comidas';

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => setMeals(res.meals));
  }, []);

  if (meals.length === 0) {
    return <h4>Loading...</h4>;

  return (
    <div>
      <Header value={ pageTitle } />
      { meals
        .map((meal, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card`}>
            <img
              src={ meal.strMealThumb }
              alt="drink"
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
          </div>
        )).slice(0, elementsNumber)}
    </div>
  );
}

export default Comidas;
