import React from 'react';
import BarraDeBusca from '../components/Header/BarraDeBusca';

class ReceitasFeitas extends React.Component {
  render() {
    const pageTitle = 'Receitas Feitas';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Receitas Feitas
      </div>
    );
  }
}

export default ReceitasFeitas;
