import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/Header/SearchHeader';
// import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

// const favoriteRecipes = [
//   {
//     id: '52771',
//     type: 'comida',
//     area: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   },
//   {
//     id: '178319',
//     type: 'bebida',
//     area: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//   },
// ];

// localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

class ReceitasFavoritas extends React.Component {
  constructor(props) {
    super(props);
    // const { params } = props.match;
    // const { id } = params;
    this.state = {
      // emptyStorage: true,
      // id,
      linkCopiado: false,
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.fetchAPI = this.fetchAPI.bind(this);
    // this.drinkDetails = this.drinkDetails.bind(this);
    // this.fetchRecomendationAPI = this.fetchRecomendationAPI.bind(this);
    // this.recomendedRecipes = this.recomendedRecipes.bind(this);
    // this.handleShare = this.handleShare.bind(this);
  }

  // const checkStorage = () => {
  //   if (storage) {
  //     this.setState({
  //       emptyStorage: false,
  //       loading: false,
  //     });
  //   }
  // };

  linkCopiadoFunction() {
    return (
      <span>Link copiado!</span>
    );
  }

  // handleClick() {

  // }

  cardReceitas() {
    console.log(storage);
    const { linkCopiado } = this.state;
    const { history } = this.props;
    return (
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        <div>
          {
            storage && storage.map((meal, index) => (
              <div key={ index }>
                {console.log(meal, index)}
                <div data-testid={ `${index}-recipe-card` }>
                  <div>
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${meal.area} - ${meal.category} - ${meal.alcoholicOrNot}`}
                    </span>
                  </div>
                  <div
                    tabIndex="0"
                    data-testid={ `${index}-horizontal-name` }
                    onClick={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    onKeyDown={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    role="link"
                  >
                    { meal.name }
                  </div>
                  <div
                    tabIndex="0"
                    onClick={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    onKeyDown={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    role="button"
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ meal.image }
                      alt={ meal.name }
                      width="150px"
                    />

                  </div>
                  <button
                    type="button"
                    onClick={ () => {
                      copy(`http://localhost:3000/${meal.type}s/${meal.id}`);
                      this.setState({
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
                  {linkCopiado ? this.linkCopiadoFunction() : ''}
                  <button
                    type="button"
                  >
                    <img
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="Desfavoritar"
                    />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    );
  }

  render() {
    const pageTitle = 'Receitas Favoritas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        { this.cardReceitas()}

      </div>
    );
  }
}

ReceitasFavoritas.propTypes = {
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

export default ReceitasFavoritas;
