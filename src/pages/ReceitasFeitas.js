import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';

class ReceitasFeitas extends React.Component {
  render() {
    const pageTitle = 'Receitas Feitas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Receitas Feitas
      </div>
    );
  }
}

export default ReceitasFeitas;
