import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import '../style.css';

const NUMBER6 = 6;
const copy = require('clipboard-copy');

class DetalhesBebidas extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      loadingRecomended: true,
      id,
      linkCopiado: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.drinkDetails = this.drinkDetails.bind(this);
    this.fetchRecomendationAPI = this.fetchRecomendationAPI.bind(this);
    this.recomendedRecipes = this.recomendedRecipes.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.fetchRecomendationAPI();
  }

  componentDidUpdate() {
    this.linkCopiadoFunction();
  }

  handleClick() {
    const { id } = this.state;
    const { history } = this.props;
    history.push(`/bebidas/${id}/in-progress`);
  }

  handleShare() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    copy(`http://localhost:3000${pathname}`);
    this.setState({
      linkCopiado: true,
    });
  }

  linkCopiadoFunction() {
    return (
      <span>Link copiado!</span>
    );
  }

  async fetchAPI() {
    const { id } = this.state;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const recipe = await response.json();
    this.setState({
      drinks: recipe,
      loading: false,
    });
  }

  async fetchRecomendationAPI() {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const recomendedRecipes = await response.json();
    this.setState({
      recomended: recomendedRecipes,
      loadingRecomended: false,
    });
  }

  recomendedRecipes() {
    const { recomended } = this.state;
    const recomendedMeals = [];
    for (let index = 0; index < NUMBER6; index += 1) {
      recomendedMeals.push(
        <div
          key={ recomended.meals[index].strMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recomended.meals[index].strMealThumb }
            alt={ recomended.meals[index].strMeal }
            width="180"
          />
          <p>
            {recomended.meals[index].strCategory}
          </p>
          <h3 data-testid={ `${index}-recomendation-title` }>
            {recomended.meals[index].strMeal}
          </h3>
        </div>,
      );
    }
    return (
      <div className="recomended">
        {recomendedMeals}
      </div>

    );
  }

  drinkDetails() {
    const { drinks, loadingRecomended, linkCopiado } = this.state;
    const drink = drinks.drinks ? drinks.drinks[0] : {};

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

    for (let index = 0; index < ingredientArray[0].length; index += 1) {
      if (ingredientArray[0][index][1]) {
        ingredientsWithMeasures.push(
          <li
            key={ ingredientArray[0][index][1] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredientArray[0][index][1]}
            {' '}
            -
            {' '}
            {measureArray[0][index][1]}
          </li>,
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
          { drink.strDrink }
        </h3>
        <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        {linkCopiado ? this.linkCopiadoFunction() : ''}
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <div data-testid="recipe-category">
          { drink.strAlcoholic }
        </div>
        <div data-testid="">
          Ingredientes
          <ul>
            {ingredientsWithMeasures}
          </ul>
        </div>
        <div data-testid="instructions">
          { drink.strInstructions }
        </div>
        <video data-testid="video" src={ drink.strYoutube }>
          <track default kind="captions" src="" />
        </video>
        <div>
          Receitas Recomendadas
          {loadingRecomended ? <Loading />
            : this.recomendedRecipes()}
        </div>
        <button
          onClick={ this.handleClick }
          data-testid="start-recipe-btn"
          type="button"
          className="make-recipe"
        >
          Iniciar Receita
        </button>

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

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.func,
    pathname: PropTypes.func,
  }).isRequired,
};

export default DetalhesBebidas;
