import React from 'react';
import BarraDeBusca from '../components/Header/BarraDeBusca';
import Footer from '../components/Footer/Footer';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Explorar;
