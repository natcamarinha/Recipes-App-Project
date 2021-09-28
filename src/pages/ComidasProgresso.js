import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import '../Progress.css';

export default class ComidasProgresso extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      id,
      Disabled: 'disabled',
    };

    this.checkAll = this.checkAll.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.mealDetails = this.mealDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleClick({ target }) {
    if (target.checked === true) {
      target.parentElement('label').className.add('linha2');
    } else {
      target.parentElement('label').className.add('');
      target.checked = false;
    }
  }

  checkAll() {
    const inputs = document.querySelectorAll('input');
    let count = 0;
    inputs.forEach((input) => {
      if (input.checked === true) {
        count += 1;
      }
    });
    const { meals } = this.state;
    const meal = meals.meals[0];
    const ingredientArray = Object
      .entries(meal)
      .filter((ingredient) => (ingredient[0].includes('Ingredient')
      && ingredient[1] !== '' && ingredient[1] !== null));
    console.log(ingredientArray.length, count);
    if (count === ingredientArray.length) {
      this.setState({
        Disabled: '',
      });
    }
  }

  async fetchAPI() {
    const { id } = this.state;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const recipe = await response.json();
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

    for (let index = 0; index < ingredientArray[0].length; index += 1) {
      if (ingredientArray[0][index][1]) {
        ingredientsWithMeasures.push(
          <label
            htmlFor="ingredient"
            className="linha1"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              name="ingredient"
              className="checked"
              onClick={ this.checkAll }
              key={ ingredientArray[0][index][1] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            />
            {ingredientArray[0][index][1]}
            {' '}
            -
            {' '}
            {measureArray[0][index][1]}
          </label>,
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
          {meal.strMeal}
        </h3>
        <button type="button" data-testid="share-btn">
          Compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <div data-testid="recipe-category">
          {meal.strCategory}
        </div>
        <div>
          Ingredientes
          <ul>
            {ingredientsWithMeasures}
          </ul>
        </div>
        <div data-testid="instructions">
          {meal.strInstructions}
        </div>
      </div>

    );
  }

  render() {
    const { loading, Disabled } = this.state;
    console.log(Disabled);

    return (
      <div>
        {loading ? <Loading />
          : this.mealDetails()}
        <div>
          <Link to="/receitas-feitas">
            <button
              data-testid="finish-recipe-btn"
              className="botaoFinalizar"
              type="button"
              disabled={ Disabled }
            >
              Finalizar receita
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

ComidasProgresso.propTypes = {
  match: PropTypes.string.isRequired,
};
