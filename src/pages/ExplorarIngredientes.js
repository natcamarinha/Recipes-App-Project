import React from 'react';
import BarraDeBusca from '../components/Header/BarraDeBusca';
import Footer from '../components/Footer/Footer';

class ExplorarIngredientes extends React.Component {
  render() {
    const pageTitle = 'Explorar Ingredientes';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarIngredientes;
