import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

export default function ExplorarIngredientes() {
  const pageTitle = 'Explorar Ingredientes';
  const [ingredients, setIngredients] = useState([]);
  const { setRecipesDb } = useContext(RecipesContext);
  const history = useHistory();
  const limits = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredients(response.drinks);
    };
    getIngredients();
  }, []);

  async function getDrinksFromIngredient(param) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`);
    const data = await response.json();
    return setRecipesDb(data.drinks);
  }

  return (
    <div>
      <SearchHeader value={ pageTitle } />
      <div className="card-container">
        {
          ingredients.map((drink, index) => (
            (index < limits) && (
              <button
                name={ drink.strIngredient1 }
                type="button"
                onClick={ ({ target }) => {
                  getDrinksFromIngredient(target.getAttribute('name'));
                  return history.push('/bebidas');
                } }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ drink.strIngredient1 }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strIngredient1 }
                    />
                  </div>
                  <div name={ drink.strIngredient1 } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { drink.strIngredient1 }
                    </span>
                  </div>
                </div>
              </button>
            )
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
