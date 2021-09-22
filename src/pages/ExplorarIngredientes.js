import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class ExplorarIngredientes extends React.Component {
  render() {
    const pageTitle = 'Explorar Ingredientes';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Explorar Ingredientes
      </div>
    );
  }
}

export default ExplorarIngredientes;
