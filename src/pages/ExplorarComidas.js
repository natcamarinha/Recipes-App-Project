import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';
import imgMeSurpreenda from '../images/imgMeSurpreenda.jpeg';
import imgIngredientes from '../images/imgIngredientes.jpeg';
import imgLocalOrigem from '../images/imgLocalOrigem.jpeg';
import './ExplorarComidas.css';

export default function ExplorarComidas() {
  const pageTitle = 'Explorar Comidas';
  const [surpriseMeal, setSurpriseMeal] = useState(0);

  useEffect(() => {
    const getRandomMeal = async () => {
      const response = await
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json());
      return setSurpriseMeal(response.meals[0].idMeal);
    };
    getRandomMeal();
  }, []);

  const randomId = surpriseMeal;

  function surprise() {
    if (randomId > 0) {
      return (
        <Link to={ `/comidas/${randomId}` }>
          <img
            className="imgMeSurpreenda"
            src={ imgMeSurpreenda }
            alt="imgMeSurpreenda"
            width="150px"
          />
          <button
            className="btnExplorarMeal"
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
    <div className="masterEc">
      <SearchHeader value={ pageTitle } />
      <Link to="/explorar/comidas/ingredientes">
        <img
          className="imgIngredientes"
          src={ imgIngredientes }
          alt="imgIngredientes"
          width="150px"
        />
        <button
          className="btnExplorarMeal"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <img
          className="imgLocalOrigem"
          src={ imgLocalOrigem }
          alt="imgLocalOrigem"
          width="150px"
        />
        <button
          className="btnExplorarMeal"
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </button>
      </Link>
      {
        surprise()
      }
      <Footer />
    </div>
  );
}
