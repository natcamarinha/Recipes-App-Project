import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

export default function ExplorarBebidas() {
  const pageTitle = 'Explorar Bebidas';
  const [surpriseDrink, setSurpriseDrink] = useState(0);

  useEffect(() => {
    const getRandomDrink = async () => {
      const response = await
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json());
      return setSurpriseDrink(response.drinks[0].idDrink);
    };
    getRandomDrink();
  }, []);

  const randomId = surpriseDrink;

  function surprise() {
    if (randomId > 0) {
      return (
        <Link to={ `/bebidas/${randomId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda!"
          >
            Me Surpreenda!
          </button>
        </Link>
      );
    }
    return <p>Loading...</p>;
  }
  return (
    <div>
      <SearchHeader value={ pageTitle } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      {
        surprise()
      }
      <Footer />
    </div>
  );
}
