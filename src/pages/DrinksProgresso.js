import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import '../Progress.css';

export default class DrinksProgresso extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      id,
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.drinkDetails = this.drinkDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { id } = this.state;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const recipe = await response.json();
    console.log(recipe);
    this.setState({
      drinks: recipe,
      loading: false,
    });
  }

  drinkDetails() {
    const { drinks } = this.state;
    const drink = drinks.drinks[0];

    const ingredientArray = [];
    const ingredientsWithMeasures = [];
    const measureArray = [];

    ingredientArray
      .push(Object
        .entries(drink)
        .filter((ingredient) => (ingredient[0].includes('Ingredient'))));
    measureArray
      .push(Object
        .entries(drink)
        .filter((ingredient) => (ingredient[0].includes('Measure'))));
    console.log(ingredientArray);
    console.log(measureArray);

    for (let index = 0; index < ingredientArray[0].length; index += 1) {
      if (ingredientArray[0][index][1]) {
        ingredientsWithMeasures.push(
          <div
            htmlFor="checkbox"
            className="linha"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              className="checkbox1"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              key={ ingredientArray[0][index][1] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            />
            {ingredientArray[0][index][1]}
            {' '}
            -
            {' '}
            {measureArray[0][index][1]}
          </div>,
        );
      }
    }

    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          width="360"
        />
        <h3 data-testid="recipe-title">
          {drink.strDrink}
        </h3>
        <button type="button" data-testid="share-btn">
          Compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <div data-testid="recipe-category">
          {drink.strAlcoholic}
        </div>
        <div data-testid="">
          Ingredientes
          <ul>
            {ingredientsWithMeasures}
          </ul>
        </div>
        <div data-testid="instructions">
          {drink.strInstructions}
        </div>
        <div>
          <Link to="/receitas-feitas">
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finalizar receita
            </button>
          </Link>
        </div>
      </div>

    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? <Loading />
          : this.drinkDetails()}
      </div>
    );
  }
}

DrinksProgresso.propTypes = {
  match: PropTypes.string.isRequired,
};
