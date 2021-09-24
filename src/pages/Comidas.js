import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Comidas() {
  const pageTitle = 'Comidas';
  const limits = 12;
  const { recipesDb, redirect } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <div>
      <Header value={ pageTitle } />
      { redirect ? history.push(`/comidas/${recipesDb.map((meal) => meal.idMeal)}`) : (
        <div>
          {
            recipesDb.map((meal, index) => ( // requisito 17, card com limite de 12
              (index < limits) && (
                <div key={ index }>
                  <div>
                    <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                  </div>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ meal.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strMeal }
                      width="150px"
                    />
                  </div>
                </div>
              )
            ))
          }
        </div>
      ) }
    </div>
  );
}

export default Comidas;
