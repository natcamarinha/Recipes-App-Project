import React, { useState } from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import shareIcon from '../images/shareIcon.svg';
import './receitasFeitas.css';

const copy = require('clipboard-copy');

export default function ReceitasFeitas() {
  const pageTitle = 'Receitas Feitas';
  const recipeStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipes, setDoneRecipes] = useState(recipeStorage);
  const [linkCopiado, setLinkCopiado] = useState(false);

  const xablau = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(xablau));

  function linkCopiadoFunction() {
    return (
      <span>Link copiado!</span>
    );
  }

  return (
    <div className="masterRecFe">
      <SearchHeader value={ pageTitle } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => (setDoneRecipes) }
          className="btnRF"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="btnRF"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="btnRF"
        >
          Drinks
        </button>
      </div>
      <div>
        {
          doneRecipes.map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              {recipe.type === 'bebida' ? (
                <div className="cardRF">
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    width="150px"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Feito em:
                    { recipe.doneDate }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                      setLinkCopiado({
                        linkCopiado: true,
                      });
                    } }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Compartilhar"
                    />
                  </button>
                  {linkCopiado ? linkCopiadoFunction() : ''}
                </div>
              ) : (
                <div className="cardRF">
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    width="150px"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Feito em:
                    { recipe.doneDate }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      copy(`http://localhost:3000/comidas/${recipe.id}`);
                      setLinkCopiado({
                        linkCopiado: true,
                      });
                    } }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Compartilhar"
                    />
                  </button>
                  {linkCopiado ? linkCopiadoFunction() : ''}
                  {
                    recipe.tags.map((tag, idx) => (
                      <p
                        key={ idx }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </p>
                    ))
                  }
                </div>
              ) }
            </div>
          ))
        }
      </div>
    </div>
  );
}
