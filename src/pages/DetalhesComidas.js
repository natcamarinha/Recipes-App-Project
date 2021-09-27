import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import '../style.css';

const NUMBER6 = 6;
const copy = require('clipboard-copy');

class DetalhesComidas extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      loadingRecomended: true,
      id,
      linkCopiado: false,
      // isDoing: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.mealDetails = this.mealDetails.bind(this);
    this.fetchRecomendationAPI = this.fetchRecomendationAPI.bind(this);
    this.recomendedRecipes = this.recomendedRecipes.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.fetchRecomendationAPI();
    this.isDoingRecipe();
  }

  componentDidUpdate() {
    this.linkCopiadoFunction();
  }

  handleClick() {
    const { id } = this.state;
    const { history } = this.props;
    // localStorage.setItem('inProgressRecipes', JSON.stringify({
    //   meals: {
    //     id: ['lista de ingredientes'],
    //   },
    // }));
    history.push(`/comidas/${id}/in-progress`);
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

  isDoingRecipe() {
    const doingRecipe = localStorage.getItem('inProgressRecipes');
    console.log(doingRecipe);
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

  async fetchRecomendationAPI() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const recomendedRecipes = await response.json();
    this.setState({
      recomended: recomendedRecipes,
      loadingRecomended: false,
    });
  }

  recomendedRecipes() {
    const { recomended } = this.state;
    const recomendedDrinks = [];
    for (let index = 0; index < NUMBER6; index += 1) {
      recomendedDrinks.push(
        <div
          key={ recomended.drinks[index].strDrink }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recomended.drinks[index].strDrinkThumb }
            alt={ recomended.drinks[index].strDrink }
            width="180"
          />
          <p>
            {recomended.drinks[index].strAlcoholic}
          </p>
          <h3 data-testid={ `${index}-recomendation-title` }>
            {recomended.drinks[index].strDrink}
          </h3>
        </div>,
      );
    }
    return (
      <div className="recomended">
        {recomendedDrinks}
      </div>

    );
  }

  mealDetails() {
    const { meals, loadingRecomended, linkCopiado } = this.state;
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
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="360"
        />
        <h3 data-testid="recipe-title">
          { meal.strMeal }
        </h3>
        <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        {linkCopiado ? this.linkCopiadoFunction() : ''}
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
        <video data-testid="video" src={ meal.strYoutube }>
          <track default kind="captions" src="" />
        </video>
        <div>
          Receitas Recomendadas
          {loadingRecomended ? <Loading />
            : this.recomendedRecipes()}
        </div>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="make-recipe"
          onClick={ this.handleClick }
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
          : this.mealDetails()}
      </div>
    );
  }
}

DetalhesComidas.propTypes = {
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

export default DetalhesComidas;
