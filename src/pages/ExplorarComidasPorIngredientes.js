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
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredients(response.meals);
    };
    getIngredients();
  }, []);

  async function getMealsFromIngredient(param) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`);
    const data = await response.json();
    setRecipesDb([]);
    return setRecipesDb(data.meals);
  }

  return (
    <div>
      <SearchHeader value={ pageTitle } />
      <div className="card-container">
        {
          ingredients.map((meal, index) => (
            (index < limits) && (
              <button
                name={ meal.strIngredient }
                type="button"
                onClick={ ({ target }) => {
                  getMealsFromIngredient(target.getAttribute('name'));
                  return history.push('/comidas');
                } }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ meal.strIngredient }
                      src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strIngredient }
                    />
                  </div>
                  <div name={ meal.strIngredient } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { meal.strIngredient }
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
