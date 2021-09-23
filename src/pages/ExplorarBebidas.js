import React from 'react';
import BarraDeBusca from '../components/Header/BarraDeBusca';
import Footer from '../components/Footer/Footer';

class ExplorarBebidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Bebidas';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidas;
