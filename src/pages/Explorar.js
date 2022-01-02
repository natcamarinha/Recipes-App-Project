import React from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';
import './Explorar.css';
import imgExplorarMeal from '../images/imgExplorarMeal.jpeg';
import imgExplorarDrink from '../images/imgExplorarDrink.jpeg';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div className="masterEx">
        <SearchHeader value={ pageTitle } />
        <Link to="/explorar/comidas">
          <section data-testid="explore-food">
            <img
              className="imgExplorarMeal"
              src={ imgExplorarMeal }
              alt="imgExplorarMeal"
              width="200px"
            />
            <button className="btnExplorar" type="button">Explorar Comidas</button>
          </section>
        </Link>
        <Link to="/explorar/bebidas">
          <section data-testid="explore-drinks">
            <img
              className="imgExplorarDrink"
              src={ imgExplorarDrink }
              alt="imgExplorarDrink"
              width="200px"
            />
            <button className="btnExplorar" type="button">Explorar Bebidas</button>
          </section>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Explorar;
