import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class ExplorarBebidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Bebidas';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Explorar Bebidas
      </div>
    );
  }
}

export default ExplorarBebidas;
