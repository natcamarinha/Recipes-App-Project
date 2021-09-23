import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Bebidas() {
  const [drinks, setDrinks] = useState([]);

  const elementsNumber = 12;

  const pageTitle = 'Bebidas';

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => setDrinks(res.drinks));
  }, []);

  if (drinks.length === 0) {
    return <h4>Loading...</h4>;
  }

  return (
    <div>
      <Header value={ pageTitle } />
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
