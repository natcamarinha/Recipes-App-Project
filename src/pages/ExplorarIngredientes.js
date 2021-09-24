import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class ExplorarIngredientes extends React.Component {
  render() {
    const pageTitle = 'Explorar Ingredientes';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarIngredientes;
