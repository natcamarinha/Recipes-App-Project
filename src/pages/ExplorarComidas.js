import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class ExplorarComidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Comidas';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Explorar Comidas
      </div>
    );
  }
}

export default ExplorarComidas;
