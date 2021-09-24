import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Bebidas() {
  const pageTitle = 'Bebidas';
  const limits = 12;
  const { recipesDb, redirect } = useContext(RecipesContext);
  const history = useHistory();
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
    </div>
  );
}

export default Bebidas;
