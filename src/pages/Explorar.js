import React from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <Link to="/explorar/comidas">
          <section data-testid="explore-food">
            <button type="button">Explorar Comidas</button>
          </section>
        </Link>
        <Link to="/explorar/bebidas">
          <section data-testid="explore-drinks">
            <button type="button">Explorar Bebidas</button>
          </section>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Explorar;
