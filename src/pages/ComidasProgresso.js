import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
// import Progress from '../Progress.css';

export default class ComidasProgresso extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      id,
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.mealDetails = this.mealDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { id } = this.state;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const recipe = await response.json();
    console.log(recipe);
    console.log(Object.keys(recipe.meals[0]));
    this.setState({
      meals: recipe,
      loading: false,
    });
  }

  mealDetails() {
    const { meals } = this.state;
    const meal = meals.meals[0];
    const ingredientArray = [];
    const ingredientsWithMeasures = [];
    const measureArray = [];

    ingredientArray
      .push(Object
        .entries(meal)
        .filter((ingredient) => (ingredient[0].includes('Ingredient'))));
    measureArray
      .push(Object
        .entries(meal)
        .filter((ingredient) => (ingredient[0].includes('Measure'))));
    console.log(ingredientArray);
    console.log(measureArray);

    for (let index = 0; index < ingredientArray[0].length; index += 1) {
      if (ingredientArray[0][index][1]) {
        ingredientsWithMeasures.push(
          <checkbox
            key={ ingredientArray[0][index][1] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredientArray[0][index][1]}
            {' '}
            -
            {' '}
            {measureArray[0][index][1]}
          </checkbox>,
        );
      }
    }

    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="360"
        />
        <h3 data-testid="recipe-title">
          { meal.strMeal }
        </h3>
        <button type="button" data-testid="share-btn">
          Compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <div data-testid="recipe-category">
          { meal.strCategory }
        </div>
        <div>
          Ingredientes
          <ul>
            {ingredientsWithMeasures}
          </ul>
        </div>
        <div data-testid="instructions">
          { meal.strInstructions }
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

ComidasProgresso.propTypes = {
  match: PropTypes.string.isRequired,
};
