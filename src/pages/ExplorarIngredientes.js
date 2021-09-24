import React from 'react';
import SearchHeader from '../components/SearchHeader';

class ExplorarIngredientes extends React.Component {
  render() {
    const pageTitle = 'Explorar Ingredientes';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Explorar Ingredientes
      </div>
    );
  }
}

export default ExplorarIngredientes;
