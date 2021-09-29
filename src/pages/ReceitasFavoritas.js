import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/Header/SearchHeader';
import Loading from '../components/Loading';
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

// localStorage.setItem('doneRecipes', JSON.stringify(favoriteRecipes));

const storage = JSON.parse(localStorage.getItem('doneRecipes'));

class ReceitasFavoritas extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      loading: true,
      emptyStorage: true,
      id,
      linkCopiado: false,
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.fetchAPI = this.fetchAPI.bind(this);
    // this.drinkDetails = this.drinkDetails.bind(this);
    // this.fetchRecomendationAPI = this.fetchRecomendationAPI.bind(this);
    // this.recomendedRecipes = this.recomendedRecipes.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  // const checkStorage = () => {
  //   if (storage) {
  //     this.setState({
  //       emptyStorage: false,
  //       loading: false,
  //     });
  //   }
  // };

  handleShare() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    copy(`http://localhost:3000${pathname}`);
    console.log('teste');
    this.setState({
      linkCopiado: true,
    });
  }

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
                    data-testid={ `${index}-horizontal-name` }
                    onClick={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    onKeyDown={this.handleShare}
                    role="link"
                  >
                    { meal.name }
                  </div>
                  <img
                    src={ meal.image }
                    data-testid={ `${index}-horizontal-image` }
                    alt={ meal.name }
                    width="150px"
                    onClick={ () => history.push(`/${meal.type}s/${meal.id}`) }
                    onKeyDown={this.handleShare}
                    role="link"
                  />
                  <button
                    type="button"
                    data-testid={ `${index}-share-btn` }
                    onClick={ this.handleShare }
                  >
                    <img src={ shareIcon } alt="Compartilhar" />
                  </button>
                  {linkCopiado ? this.linkCopiadoFunction() : ''}
                  <button
                    type="button"
                    data-testid={ `${index}-favorite-btn` }
                  >
                    <img src={ blackHeartIcon } alt="Desfavoritar" />
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
    const { loading } = this.state;
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
