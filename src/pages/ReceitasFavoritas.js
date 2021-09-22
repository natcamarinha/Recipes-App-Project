import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class ReceitasFavoritas extends React.Component {
  render() {
    const pageTitle = 'Receitas Favoritas';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Receitas Favoritas
      </div>
    );
  }
}

export default ReceitasFavoritas;
