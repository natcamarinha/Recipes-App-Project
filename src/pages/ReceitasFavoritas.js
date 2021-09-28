import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';

class ReceitasFavoritas extends React.Component {
  render() {
    const pageTitle = 'Receitas Favoritas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Receitas Favoritas
      </div>
    );
  }
}

export default ReceitasFavoritas;
