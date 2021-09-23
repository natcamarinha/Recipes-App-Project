import React from 'react';
import BarraDeBusca from '../components/Header/BarraDeBusca';
import Footer from '../components/Footer/Footer';

class Perfil extends React.Component {
  render() {
    const pageTitle = 'Perfil';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Perfil;
